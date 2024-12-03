import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';


type props = NativeStackScreenProps<rootStackParams, 'ScreenBrokenDetect'>;

const ScreenBrokenDetectScreen = ({ navigation, route }: props) => {
    const [timeLeft, setTimeLeft] = useState(6);
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [showDataMatrix, setShowDataMatrix] = useState(false);

    const onTimeOut = async () => {
        setShowDataMatrix(true); // 顯示 DataMatrix 圖片
        setTimeout(async () => {
            const pic = await _takePicture(); // 拍攝顯示 DataMatrix 圖片的畫面
            navigation.replace("ScreenBrokenDetectResult", {
                userData: route.params.userData,
                phoneName: route.params.phoneName,
                phoneType: route.params.phoneType,
                phoneNumber: route.params.phoneNumber,
                takenPhoto: pic,
            });
        }, 1000); // 等待 1 秒再拍照
    };

    let camera = useRef<CameraView>(null);

    const _takePicture = async () => {
        if (camera.current) {
            console.log("Taking Picture");

            const options = { quality: 1, base64: true, skipProcessing: false };
            let photo = await camera.current.takePictureAsync(options);

            // 照片裁切邏輯 (根據畫面位置調整裁切範圍)
            const cropWidth = photo!.width * 0.65;
            const cropHeight = photo!.height * 0.65;
            const originX = photo!.width * 0.18;
            const originY = photo!.height * 0.15;

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

            return croppedImage.uri;
        }
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeOut();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime: any) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    if (!permission) {
        return (
            <View>
                <Text>Camera permissions are still loading.</Text>
            </View>
        );
    }

    if (!permission?.granted) {
        Alert.alert('Camera permission required', 'Please allow camera permission to proceed.');
        requestPermission();
        return <Text>No access to camera</Text>;
    }

    return (
        <CameraView facing={facing} style={styles.background} ref={camera}>
            <View style={styles.overlay}>
                {showDataMatrix && (
                    <Image
                        source={require('@Assets/Images/DataMatrix.png')} // 顯示 DataMatrix 圖片
                        style={styles.fullScreenImage} // 修改為全螢幕樣式
                    />
                )}
                {!showDataMatrix && (
                    <>
                        <View style={styles.topOverlay} />
                        <View style={styles.leftOverlay} />
                        <View style={styles.transparentRectangle} />
                        <View style={styles.rightOverlay} />
                        <View style={styles.bottomOverlay} />

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
                    </>
                )}
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
        height: '100%',
    },
    overlay: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        position: 'relative',
    },
    fullScreenImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // 確保圖片填滿畫面
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
    title: {
        position: 'absolute',
        width: '120%',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 26,
        marginVertical: 20,
        marginTop: 65,
    },
    instructionText: {
        width: '80%',
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 10,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 65,
    },
});



export { ScreenBrokenDetectScreen };

