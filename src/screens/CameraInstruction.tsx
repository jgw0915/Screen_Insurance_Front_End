import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';

type props = NativeStackScreenProps<rootStackParams, 'CameraInstruction'>;

const CameraInstructionScreen = ({navigation, route}:props) => {
    const [timeLeft, setTimeLeft] = useState(5);
    const onTimeOut = () => {
        navigation.replace("ScreenBrokenDetect", {
            userData: route.params.userData,
            phoneName: route.params.phoneName,
            phoneType: route.params.phoneType,
            phoneNumber: route.params.phoneNumber,
        });
    }
        
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

    return (
        <ImageBackground
            source={require('@Assets/wood_table.png')}
            style={styles.background}
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
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 26,
        marginVertical: 20,
        marginTop: 65,
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
        color: '#FFFFFF',
        fontSize: 22,
        textAlign: 'center',
        marginTop: "auto",
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 65,
    },
});

export { CameraInstructionScreen };

