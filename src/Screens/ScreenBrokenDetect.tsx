import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { rootStackParams } from '../Navigator/stack/StackNavigator';
// import { CLASSES } from '../data/classes';

type props = NativeStackScreenProps<rootStackParams, 'ScreenBrokenDetect'>;

const ScreenBrokenDetectScreen = ({navigation, route}:props) => {
    const [timeLeft, setTimeLeft] = useState(10);
    // const [facing, setFacing] = useState<CameraType>('front');
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('front')!;
    const [isTimerActive, setIsTimerActive] = useState(false);

    const CLASSES = ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light', 
        'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 
        'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee', 
        'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 
        'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple', 
        'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch', 
        'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone', 
        'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear', 
        'hair drier', 'toothbrush'];

    // const classIndices = getClassIndices(CLASSES);
    // console.log(`CLASSES array:`, CLASSES);
    
    const objectDetection = useTensorflowModel(require('@Assets/Models/ssd-mobilenet-v1-tflite-default-v1.tflite'))
    const model = objectDetection.state === "loaded" ? objectDetection.model : undefined

    const { resize } = useResizePlugin()

    useEffect(() => {
        if (!isTimerActive) return; // Do nothing if the timer is not active

        if (timeLeft <= 0) {
            onTimeOut();
            setIsTimerActive(false); // Stop the timer after timeout
            return;
        }

        console.log(`Time left: ${timeLeft}`);

        const timerId = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
        return () => clearInterval(timerId); // Cleanup
    }, [timeLeft, isTimerActive]);

    const frameProcessor = useFrameProcessor((frame:any) => {
        'worklet'
        if (model == null) {
            return
        }
        // const canvas = new SkCanvas(frame);
        // 1. Resize 4k Frame to 320x320x3 using vision-camera-resize-plugin
        const resized = resize(frame, {
            scale: {
            width: 320,
            height: 320,
            },
            pixelFormat: 'rgb',
            dataType: 'uint8',
        })

        // 2. Run model with given input buffer synchronously
        const outputs = model.runSync([resized])

        // 3. Interpret outputs accordingly
        const detection_boxes = outputs[0]
        const detection_classes = outputs[1]
        const detection_scores = outputs[2]
        const num_detections = outputs[3]
        // console.log(`Detected ${num_detections[0]} objects!`)

        for (let i = 0; i < detection_boxes.length; i += 4) {
            const confidence = detection_scores[i / 4]
            const detected_class_index = detection_classes[i / 4]
            console.log(`Detected object with confidence ${confidence}`)
            console.log(`Detected class index: ${detected_class_index}`);
            
            if (detected_class_index < CLASSES.length) {
                const detect_object = CLASSES[Number(detected_class_index)];
                console.log(`Detected object with confidence ${confidence}`);
                console.log(`Class: ${detect_object}`);
                if (confidence > 0.7) {
                    // 4. Draw a red box around the detected object!
                    const left = detection_boxes[i];
                    const top = detection_boxes[i + 1];
                    const right = detection_boxes[i + 2];
                    const bottom = detection_boxes[i + 3];
                    // const rect = SkRect.Make(left, top, right, bottom)
                    // canvas.drawRect(rect, SkColors.Red)
                    if (detect_object === 'cell phone') {
                        setIsTimerActive(true);
                    }
                }
            } else {
                // console.error(`No class found for index ${detected_class_index}`);
            }
        }
    }, [model])

    function getClassIndices(classes:any) {
        const indices = [];
        for (let i = 0; i < classes.length; i++) {
            if (classes[i].id !== undefined) {
                indices.push(classes[i].id);
            }
        }
        return indices;
    }

    const onTimeOut = async() => {
        // const pic = await _takePicture();
        navigation.replace("ScreenBrokenDetectResult", {
            userData: route.params.userData,
            phoneName: route.params.phoneName,
            phoneType: route.params.phoneType,
            phoneNumber: route.params.phoneNumber,
            takenPhoto: "https://png.pngtree.com/png-clipart/20230303/original/pngtree-broken-phone-screen-design-png-image_8971601.png",
        });
    }

    let camera = useRef<Camera>(null);


    const _takePicture = async () => {
        if (camera.current) {
            console.log("Taking Picture");
    
            // Take the picture
            let photo = await camera.current.takePhoto();
    
            // Log the photo dimensions
            console.log(`Photo dimensions: width=${photo.width}, height=${photo.height}`);
    
            // Ensure photo properties are valid
            const photoWidth = photo.width;
            const photoHeight = photo.height;
    
            // Calculate the crop dimensions
            let cropWidth = Math.floor(photoWidth * 0.65); // Adjust as per your rectangle
            let cropHeight = Math.floor(photoHeight * 0.65);
            let originX = Math.floor(photoWidth * 0.18);
            let originY = Math.floor(photoHeight * 0.15);
    
            // Ensure crop dimensions stay within bounds (strict checks)
            if (originX + cropWidth > photoWidth) {
                cropWidth = photoWidth - originX - 1; // Reduce by 1 pixel to ensure validity
            }
            if (originY + cropHeight > photoHeight) {
                cropHeight = photoHeight - originY - 1; // Reduce by 1 pixel to ensure validity
            }
    
            // Log final crop parameters
            console.log(`Final Crop dimensions: originX=${originX}, originY=${originY}, cropWidth=${cropWidth}, cropHeight=${cropHeight}`);
            console.log(`Validation: originX + cropWidth=${originX + cropWidth}, photoWidth=${photoWidth}`);
            console.log(`Validation: originY + cropHeight=${originY + cropHeight}, photoHeight=${photoHeight}`);
    
            // Perform the crop using ImageManipulator
            try {
                const croppedImage = await ImageManipulator.manipulateAsync(
                    photo.path!,
                    [
                        {
                            crop: {
                                originX: originX,
                                originY: originY,
                                width: cropWidth,
                                height: cropHeight,
                            },
                        },
                    ],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                );
    
                const source = croppedImage.uri;
                console.log("Cropped Image URI:", source);
                return source; // Return the cropped photo URI
            } catch (error) {
                console.error("Error during image manipulation:", error);
                throw error; // Re-throw the error to handle it higher up
            }
        } else {
            console.error("Camera is not initialized.");
        }
    };
    
    

    if (!hasPermission) {
        Alert.alert('Camera permission required', 'Please allow camera permission to proceed.');
        requestPermission();
        return <Text>No access to camera</Text>;
    }

    // if (device == null) return <Text />
    return (
        <Camera
            style={styles.background}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            ref={camera}
            photo={true}
        >
            <View style={styles.overlay}>
                {/* Top overlay part above the rectangle */}
                <View style={styles.topOverlay} />

                {/* Left overlay part next to the rectangle */}
                <View style={styles.leftOverlay} />

                {/* Transparent Rectangle Area */}
                <View style={styles.transparentRectangle} />

                {/* Right overlay part next to the rectangle */}
                <View style={styles.rightOverlay} />

                {/* Bottom overlay part below the rectangle */}
                <View style={styles.bottomOverlay} />

                {/* Instruction Text, Back Button, Title*/}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={34} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>New Insurance</Text>
                <Text style={styles.instructionText}>
                    Please use the front camera to place your phone within the rectangle and wait for 5 seconds.
                </Text>
            </View>
        </Camera>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height : '100%',
    },
    title: {
        position : 'absolute',
        width: '120%',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 26,
        marginVertical: 20,
        marginTop: 65,
    },
    camera: {
        marginLeft: 'auto',
        marginRight: 'auto',
        alignContent: 'center',
        justifyContent: 'center',
        top: 60,
        flex: 1,
        borderRadius: 10,
        width: '80%',
    },
    overlay: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        borderRadius: 70,
    },
    topOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '15%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    leftOverlay: {
        position: 'absolute',
        top: '15%',
        left: 0,
        width: '18%',
        height: '65%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transparentRectangle: {
        position: 'absolute',
        top: '15%',
        left: '18%',
        width: '65%',
        height: '65%',
        borderColor: '#FFF',
        borderWidth: 2,
        borderRadius: 10,
    },
    rightOverlay: {
        position: 'absolute',
        top: '15%',
        right: 0,
        width: '17%',
        height: '65%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '20%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    instructionText: {
        width: '80%',
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        marginTop: "auto",
        marginBottom: 10,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 65,
    },
});

export { ScreenBrokenDetectScreen };

