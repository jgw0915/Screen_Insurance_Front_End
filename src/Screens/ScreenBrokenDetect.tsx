import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';


type props = NativeStackScreenProps<rootStackParams, 'ScreenBrokenDetect'>;

const ScreenBrokenDetectScreen = ({navigation, route}:props) => {
    const [timeLeft, setTimeLeft] = useState(6);
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();

    const onTimeOut = async() => {
        const pic = await _takePicture();
        // console.log("pic = ",pic);
        navigation.replace("ScreenBrokenDetectResult", {
            userData: route.params.userData,
            phoneName: route.params.phoneName,
            phoneType: route.params.phoneType,
            phoneNumber: route.params.phoneNumber,
            takenPhoto: pic,
        });
    }

    let camera = useRef<CameraView>(null);


    const _takePicture = async () => {
        // console.log("camera.current = ",camera.current);
        if (camera.current) {
            console.log("Taking Picture");

        // Take the picture
        const options = { quality: 1, base64: true, skipProcessing: false };
        let photo = await camera.current.takePictureAsync(options);

        // Determine the crop area dimensions
        // These values should be calculated based on the rectangle area on the screen
        const cropWidth = photo!.width * 0.65; // The width of the rectangle
        const cropHeight = photo!.height * 0.65; // The height of the rectangle
        const originX = photo!.width * 0.18; // Starting X position
        const originY = photo!.height * 0.15; // Starting Y position

        // Crop the image using ImageManipulator
        const croppedImage = await ImageManipulator.manipulateAsync(
            photo!.uri,
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
        return source; // Return the cropped photo URI
    }
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeOut();
            return;
        }
        
        const timerId = setInterval(() => {
            setTimeLeft((prevTime:any) => prevTime - 1);
        }, 1000);
    
        return () => clearInterval(timerId); // Cleanup on unmount or when timeLeft changes
        }, [timeLeft, onTimeOut]);
    
    if (!permission) {
        // Camera permissions are still loading.
        return(
            <View>
                <Text>Camera permissions are still loading.</Text>
            </View>
        )
    }

    if (!permission?.granted) {
        Alert.alert('Camera permission required', 'Please allow camera permission to proceed.');
        requestPermission();
        return <Text>No access to camera</Text>;
    }

    return (
        <CameraView
            facing={facing}
            style={styles.background}
            ref ={camera}
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
        </CameraView>
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

