// Copyright 2024 Google LLC.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include <cstring>
#include <memory>
#include <utility>
#include <vector>

#include <gtest/gtest.h>
#include "absl/log/absl_log.h"
#include "absl/log/log.h"
#include "absl/strings/string_view.h"
#include "tensorflow/lite/c/c_api_opaque.h"
#include "tensorflow/lite/c/common.h"
#include "tensorflow/lite/experimental/litert/c/litert_common.h"
#include "tensorflow/lite/experimental/litert/c/litert_dispatch_delegate.h"
#include "tensorflow/lite/experimental/litert/c/litert_tensor_buffer.h"
#include "tensorflow/lite/experimental/litert/cc/litert_tensor_buffer.h"
#include "tensorflow/lite/experimental/litert/runtime/external_litert_buffer_context.h"
#include "tensorflow/lite/experimental/litert/test/common.h"
#include "tensorflow/lite/experimental/litert/test/testdata/simple_model_test_vectors.h"
#include "tensorflow/lite/interpreter.h"
#include "tensorflow/lite/signature_runner.h"

namespace litert {
namespace {

using ::litert::testing::MakeRuntimeFromTestFileWithNpuModel;

static constexpr absl::string_view kNpuFile = kMediaTekModelFileName;
static constexpr absl::string_view kTfliteFile = "simple_model_npu.tflite";

TEST(DispatchDelegate, MediaTekCpuBuffer) {
  auto runtime = MakeRuntimeFromTestFileWithNpuModel(kTfliteFile, kNpuFile);
  ASSERT_TRUE(runtime) << "Failed to initialize tflite interpreter";
  auto& rt = **runtime;
  auto& interpreter = rt.Interpreter();

  litert::internal::ExternalLiteRtBufferContext buffer_context;
  interpreter.SetExternalContext(kTfLiteLiteRtBufferContext, &buffer_context);

  EXPECT_EQ(interpreter.nodes_size(), 1);
  EXPECT_EQ(interpreter.inputs().size(), 2);
  EXPECT_EQ(interpreter.outputs().size(), 1);
  ASSERT_EQ(interpreter.execution_plan().size(), 1);

  auto dispatch_delegate_options = CreateDispatchDelegateOptionsPtr();
  LiteRtDispatchDelegateAddAllocBaseOption(dispatch_delegate_options.get(),
                                           rt.Flatbuffer().Buf().Data());
  auto dispatch_delegate =
      CreateDispatchDelegatePtr(std::move(dispatch_delegate_options));

#if !defined(__ANDROID__)
  GTEST_SKIP() << "The rest of this test is specific to Android devices with a "
                  "MediaTek NPU";
#endif

  ASSERT_EQ(interpreter.ModifyGraphWithDelegate(dispatch_delegate.get()),
            kTfLiteOk);

  // Get the list of signatures and check it.
  auto signature_defs = interpreter.signature_keys();
  ASSERT_EQ(signature_defs.size(), 0);

  tflite::impl::SignatureRunner* runner =
      interpreter.GetSignatureRunner(/*signature_key=*/nullptr);
  ASSERT_NE(runner, nullptr);

  EXPECT_EQ(runner->AllocateTensors(), kTfLiteOk);

  // Fill model inputs.
  ASSERT_STREQ(runner->input_names()[0], "arg0");
  auto input_0_tensor = runner->input_tensor("arg0");
  ASSERT_NE(input_0_tensor, nullptr);
  auto* input_0 = input_0_tensor->data.f;
  std::memcpy(input_0, kTestInput0Tensor, sizeof(kTestInput0Tensor));

  ASSERT_STREQ(runner->input_names()[1], "arg1");
  auto input_1_tensor = runner->input_tensor("arg1");
  ASSERT_NE(input_1_tensor, nullptr);
  auto* input_1 = input_1_tensor->data.f;
  std::memcpy(input_1, kTestInput1Tensor, sizeof(kTestInput1Tensor));

  EXPECT_EQ(runner->Invoke(), kTfLiteOk);

  // Check model output.
  ASSERT_STREQ(runner->output_names()[0], "tfl.custom");
  auto output_tensor = runner->output_tensor("tfl.custom");
  ASSERT_NE(output_tensor, nullptr);
  auto* output = output_tensor->data.f;
  for (auto i = 0; i < kTestOutputSize; ++i) {
    ABSL_LOG(INFO) << output[i] << "\t" << kTestOutputTensor[i];
  }
  for (auto i = 0; i < kTestOutputSize; ++i) {
    EXPECT_NEAR(output[i], kTestOutputTensor[i], 1e-5);
  }
}

TEST(DispatchDelegate, MediaTekHwBuffer) {
  auto runtime = MakeRuntimeFromTestFileWithNpuModel(kTfliteFile, kNpuFile);
  ASSERT_TRUE(runtime) << "Failed to initialize tflite interpreter";
  auto& rt = **runtime;
  auto& interpreter = rt.Interpreter();

  litert::internal::ExternalLiteRtBufferContext buffer_context;
  interpreter.SetExternalContext(kTfLiteLiteRtBufferContext, &buffer_context);

  EXPECT_EQ(interpreter.nodes_size(), 1);
  EXPECT_EQ(interpreter.inputs().size(), 2);
  EXPECT_EQ(interpreter.outputs().size(), 1);
  ASSERT_EQ(interpreter.execution_plan().size(), 1);

  auto dispatch_delegate_options = CreateDispatchDelegateOptionsPtr();
  LiteRtDispatchDelegateAddAllocBaseOption(dispatch_delegate_options.get(),
                                           rt.Flatbuffer().Buf().Data());
  auto dispatch_delegate =
      CreateDispatchDelegatePtr(std::move(dispatch_delegate_options));

#if !defined(__ANDROID__)
  GTEST_SKIP() << "The rest of this test is specific to Android devices with a "
                  "MediaTek NPU";
#endif

  ASSERT_EQ(interpreter.ModifyGraphWithDelegate(dispatch_delegate.get()),
            kTfLiteOk);

  // Create and register tensor buffers for all inputs and outputs.

  std::vector<litert::TensorBuffer> input_buffers;
  for (int i = 0; i < interpreter.inputs().size(); ++i) {
    auto input_buffer_requirements =
        buffer_context.GetBufferRequirement(interpreter.input_tensor(i));
    ASSERT_TRUE(input_buffer_requirements);
    ASSERT_EQ((*input_buffer_requirements)->SupportedTypes().Value()[0],
              kLiteRtTensorBufferTypeAhwb);
    auto input_buffer =
        buffer_context.CreateBufferForTensor(interpreter.input_tensor(i));
    ASSERT_TRUE(input_buffer);
    ASSERT_TRUE(input_buffer->IsOwned());
    ASSERT_EQ(*input_buffer->BufferType(), kLiteRtTensorBufferTypeAhwb);
    auto duplicate_buffer = (*input_buffer).Duplicate();
    ASSERT_TRUE(duplicate_buffer);
    auto status = buffer_context.RegisterTensorBuffer(
        interpreter.input_tensor(i), std::move(*duplicate_buffer));
    ASSERT_EQ(status, kLiteRtStatusOk);
    input_buffers.push_back(std::move(*input_buffer));
  }

  std::vector<litert::TensorBuffer> output_buffers;
  for (int i = 0; i < interpreter.outputs().size(); ++i) {
    auto output_buffer_requirements =
        buffer_context.GetBufferRequirement(interpreter.output_tensor(i));
    ASSERT_TRUE(output_buffer_requirements);
    ASSERT_EQ((*output_buffer_requirements)->SupportedTypes().Value()[0],
              kLiteRtTensorBufferTypeAhwb);
    auto output_buffer =
        buffer_context.CreateBufferForTensor(interpreter.output_tensor(i));
    ASSERT_TRUE(output_buffer.HasValue());
    ASSERT_TRUE(output_buffer->IsOwned());
    ASSERT_EQ(*output_buffer->BufferType(), kLiteRtTensorBufferTypeAhwb);
    auto duplicate_buffer = (*output_buffer).Duplicate();
    ASSERT_TRUE(duplicate_buffer);
    auto status = buffer_context.RegisterTensorBuffer(
        interpreter.output_tensor(i), std::move(*duplicate_buffer));
    ASSERT_EQ(status, kLiteRtStatusOk);
    output_buffers.push_back(std::move(*output_buffer));
  }

  // Get the list of signatures and check it.
  auto signature_defs = interpreter.signature_keys();
  ASSERT_EQ(signature_defs.size(), 0);

  tflite::impl::SignatureRunner* runner =
      interpreter.GetSignatureRunner(/*signature_key=*/nullptr);
  ASSERT_NE(runner, nullptr);

  EXPECT_EQ(runner->AllocateTensors(), kTfLiteOk);

  // Fill model inputs.
  ASSERT_STREQ(runner->input_names()[0], "arg0");
  auto& input_0_buffer = input_buffers[0];
  {
    auto lock_and_addr = litert::TensorBufferScopedLock::Create(input_0_buffer);
    ASSERT_TRUE(lock_and_addr);
    std::memcpy(lock_and_addr->second, kTestInput0Tensor,
                sizeof(kTestInput0Tensor));
  }
  ASSERT_STREQ(runner->input_names()[1], "arg1");
  auto& input_1_buffer = input_buffers[1];
  {
    auto lock_and_addr = litert::TensorBufferScopedLock::Create(input_1_buffer);
    ASSERT_TRUE(lock_and_addr);
    std::memcpy(lock_and_addr->second, kTestInput1Tensor,
                sizeof(kTestInput1Tensor));
  }

  EXPECT_EQ(runner->Invoke(), kTfLiteOk);

  // Check model output.
  ASSERT_STREQ(runner->output_names()[0], "tfl.custom");
  auto& output_buffer = output_buffers[0];
  {
    auto lock_and_addr = litert::TensorBufferScopedLock::Create(output_buffer);
    ASSERT_TRUE(lock_and_addr);
    const float* output = reinterpret_cast<const float*>(lock_and_addr->second);
    for (auto i = 0; i < kTestOutputSize; ++i) {
      ABSL_LOG(INFO) << "Result: " << output[i] << "\t" << kTestOutputTensor[i];
    }
    for (auto i = 0; i < kTestOutputSize; ++i) {
      EXPECT_NEAR(output[i], kTestOutputTensor[i], 1e-5);
    }
  }
}

}  // namespace
}  // namespace litert