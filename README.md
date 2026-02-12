# Screen Insurance Front End

Screen Insurance Front End is a React Native (Expo) app for mobile screen-insurance onboarding and validation.

The app combines on-device visual pre-checks and backend verification to reduce fraud risk and improve user experience.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (recommended version 18 or newer)
- Java Development Kit (JDK) 17
- Android Studio
- Android SDK with the following components:
  - Build Tools 35.0.0
  - Android SDK Platform 35
  - Android NDK 26.1.10909125

## Environment Setup

1. Install Android Studio.
2. Configure Android SDK (via Android Studio):
   - Android SDK Platform 35
   - Android SDK Build-Tools 35.0.0
   - Android NDK 26.1.10909125
3. Set up environment variables:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jgw0915/Screen_Insurance_Front_End.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Running the Project

1. Start Metro Bundler:

```bash
npm run start
# or
yarn start
```

2. Run on Android:

```bash
npm run android
# or
yarn android
```

### Running on a Device

1. Enable USB debugging on your Android device.
2. Connect your device via USB.
3. Run `adb devices` to verify your device is connected.
4. Run the project using the commands above.

### Running on an Emulator

1. Open Android Studio.
2. Open AVD Manager and create/start an Android Virtual Device.
3. Run the project using the commands above.

## How We Improved YOLOv7-Based Visual Recognition in Screen Insurance APP

This apps visual-recognition strategy is inspired by the thesis paper:
`An Improved YOLOv7-Based Model for Real-Time Meter Reading with PConv and Attention Mechanisms.pdf`.

It is also aligned with the end-to-end business flow demonstrated in:
`FYP Final Presentation.pdf`.

### 1) Core model ideas adapted from the thesis

From the thesis, we adopted the following engineering direction for mobile-friendly detection:

- Replace selected standard convolutions with `PConv`-style design to reduce redundant computation.
- Introduce an attention-enhanced detection head (`DyHead` concept) to improve hard/small-feature recognition.
- Keep a real-time-first balance between model size, FLOPs, and detection quality.

In the paper, this combination improved efficiency and maintained strong accuracy; in our app context, the same principle is used to support responsive on-device screening before cloud validation.

### 2) Data and robustness strategy

Following the thesis methodology, we treat robustness as a data problem as much as a model problem:

- Multi-condition images (angle, distance, lighting, cleanliness) for better generalization.
- Augmentation to simulate noise/blur and real-world artifacts.
- Validation under practical, non-lab capture conditions.

For screen-insurance scenarios, this directly maps to diverse phone models, reflections, lighting changes, and varying crack patterns.

### 3) Deployment strategy in current Screen Insurance APP

As presented in `FYP Final Presentation.pdf`, the runtime pipeline is:

- On-device pre-check with YOLOv7 + TensorFlow Lite for fast first-pass screening.
- Capture process constraints (framing + timed capture) to stabilize input quality.
- Upload image plus device-linked metadata for backend verification.
- Cloud-side re-check (Amazon Rekognition workflow in the presentation architecture) for additional decision confidence.

This hybrid architecture keeps user interaction fast while preserving risk control.

### 4) Fraud-control integration with vision results

The presentation emphasizes anti-fraud requirements (e.g., insure device A, claim with device B).
The app integrates visual detection with device identity verification:

- Android path: IMEI-linked verification during insurance and claim steps.
- iOS path (project-level architecture): DeviceCheck-style uniqueness checks.

By combining identity consistency checks with model-based screen assessment, the system reduces false claims and improves underwriting confidence.

### 5) Practical takeaway for this project

The thesis provided the model-optimization blueprint (`PConv + attention + real-time tradeoff`), while the FYP system design provided the production workflow (`device pre-check + backend confirmation + device uniqueness control`).

Our current Screen Insurance APP applies both: better visual recognition performance under mobile constraints and stronger operational reliability in real insurance usage.

## Troubleshooting

Common issues and their solutions:

- If you encounter build errors, try:

```bash
cd android
./gradlew clean
```

- For `SDK location not found` error:
  Create a `local.properties` file in the `android` folder with:

```txt
sdk.dir=/path/to/your/Android/sdk
```

- For Android build error:

```txt
Could not determine the dependencies of task ':react-native-imei:bundleLibCompileToJarDebug'.
> Could not create task ':react-native-imei:compileDebugJavaWithJavac'.
   > In order to compile Java 9+ source, please set compileSdkVersion to 30 or above
```

Modify the SDK version in `./node_modules/react-native-imei/android/gradle.build` to above 30.

## Minimum Requirements

- Android SDK: API 24 (Android 7.0)
- Target SDK: API 34 (Android 14)
- Build Tools: 35.0.0

## Additional Information

For more detailed information about React Native setup and troubleshooting, visit:
[React Native Documentation](https://reactnative.dev/docs/environment-setup)
