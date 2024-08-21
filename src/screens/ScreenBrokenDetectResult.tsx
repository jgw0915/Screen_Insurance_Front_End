import { Ionicons } from '@expo/vector-icons';
import { CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';

type props = NativeStackScreenProps<rootStackParams, 'ScreenBrokenDetectResult'>;

const ScreenBrokenDetectResultScreen = ({navigation,route}:props) => {
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission?.granted) {
        Alert.alert('Camera permission required', 'Please allow camera permission to proceed.');
        requestPermission();
        return <Text>No access to camera</Text>;
    }

    const handleCaptureAgain = async () => {
        navigation.replace("ScreenBrokenDetect", {
            userData: route.params.userData,
            phoneName: route.params.phoneName,
            phoneType: route.params.phoneType,
            phoneNumber: route.params.phoneNumber,
        });
        // You can store the photo or do further processing here
        // }
    };

    const handleSubmitForVerification = () => {
        Alert.alert('Verification Submitted', 'Your photo has been submitted for verification.');
        // Add your submission logic here
    };

    // console.log("takenPhoto = ",route.params.takenPhoto);

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={34} color="white" />
        </TouchableOpacity>
        <View style={styles.cameraContainer}>
            <Image source={{ uri: route.params.takenPhoto }}  style={styles.camera}></Image>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={styles.disabledButton}
            onPress={handleCaptureAgain}
            disabled={!permission.granted}
            >
                <Text style={styles.buttonText}>Capture Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitForVerification}
            >
            <Text style={styles.buttonText}>Submit for Verification</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.cautionText}>Please ensure the picture is valid for verifying your device status.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#24232b',
        padding: 20,
    },
    goBackButton: {
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        marginTop: 40,
        marginBottom: 20,
    },
    cameraContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 100,
        marginBottom: 20,
    },
    submitButton: {
        alignContent: 'center',
        justifyContent: 'center',
        padding: 5,
        width: '40%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#0056FF',
    },
    disabledButton: {
        alignContent: 'center',
        justifyContent: 'center',
        padding: 5,
        width: '40%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#555',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
    cautionText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
});

export { ScreenBrokenDetectResultScreen };

