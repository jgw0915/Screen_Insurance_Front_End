import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { Loader } from '../Components';
import { rootStackParams } from '../Navigator/stack/StackNavigator';


type props = NativeStackScreenProps<rootStackParams, 'NewInsurance'>;

type checkItems = {
    label: "Internet Access" | "Microphone" | "Face ID" | "Camera Access";
};


const NewInsuranceScreen = ({navigation,  route }:props) => {
    const [userData, setUserData] = useState(route.params.userData);
    const [phoneName, setPhoneName] = useState(route.params.phoneName);
    const [phoneType, setPhoneType] = useState(route.params.phoneType);
    const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);

    const [internetAccessChecked, setInternetAccessChecked] = useState(false);
    const [microphoneChecked, setMicrophoneChecked] = useState(false);
    const [faceIDChecked, setFaceIDChecked] = useState(false);
    const [cameraChecked, setCameraChecked] = useState(false);

    const CountdownTimer = ({ initialTime, onTimeOut }: { initialTime: number; onTimeOut: () => void }) => {
        const [timeLeft, setTimeLeft] = useState(initialTime);
        
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
    
        return;
    };

    const handledHardwareCheck = (label: string) => {
        CountdownTimer({ initialTime: 1, onTimeOut: () => stimulateHardwareCheck(label) });
        switch(label){
            case "Internet Access":
                return internetAccessChecked;
            case "Microphone":
                return microphoneChecked;
            case "Face ID":
                return faceIDChecked;
            default:
                return cameraChecked;
        }
    }

    const handleCheckItemsType = (label: string) => {
        switch(label){
            case "Internet Access":
                return <AntDesign name ="wifi" size={24} color={"#ffffff"}/>;
            case "Microphone":
                return <AntDesign name ="sound" size={24} color={"#ffffff"}/>;
            case "Face ID":
                return <AntDesign name ="lock" size={24} color={"#ffffff"}/>;
            default:
                return <AntDesign name ="camera" size={24} color={"#ffffff"}/>;
        }
    }


    const stimulateHardwareCheck = (label: string) => {
        switch(label) {
            case "Internet Access":
            setInternetAccessChecked(true);
            break;
        case "Microphone":
            setMicrophoneChecked(true);
            break;
        case "Face ID":
            setFaceIDChecked(true);
            break;
        default:
            setCameraChecked(true);
            break;
        }
    };

    const HardwareCheckItem = ({ label }: checkItems ) => (
        <View style={styles.hardwareCheckItem}>
            {handleCheckItemsType(label)}
            <Text style={styles.hardwareCheckLabel}>{label}</Text>
            {
                handledHardwareCheck(label) ?
                <AntDesign name="checkcircle" size={30} color={"#21f773"}/>:
                <Loader/>
            }
        </View>
    );


    return (
        <View style={styles.container}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
        >
            <Ionicons name="arrow-back" size={34} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>New Insurance</Text>
        <View style={styles.phoneInfo}>
            <Image source={
                phoneType === "IPhone" ?
                require('@Assets/Icons/Apple.png')
                : require('@Assets/Icons/Android.png')
                } style={styles.phoneImage} />
            <Text style={styles.phoneName}>{phoneName}</Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        </View>
        <ScrollView style={styles.hardwareChecks}>
            <HardwareCheckItem label="Internet Access" />
            <HardwareCheckItem label="Microphone" />
            <HardwareCheckItem label="Face ID" />
            <HardwareCheckItem label="Camera Access" />
        </ScrollView>
        <TouchableOpacity
            style={
                microphoneChecked && internetAccessChecked && faceIDChecked && cameraChecked ?
                styles.startInsuranceButton:
                styles.waitForLoadingButton
            }
            onPress={
                microphoneChecked && internetAccessChecked && faceIDChecked && cameraChecked ?
                () => navigation.navigate("ScreenBrokenDetect", {phoneName, phoneNumber, phoneType, userData}):
                () => {}
            }
            disabled={microphoneChecked && internetAccessChecked && faceIDChecked && cameraChecked ? false : true}
        >
            <Text style={
                microphoneChecked && internetAccessChecked && faceIDChecked && cameraChecked ?
                styles.startInsuranceButtonText:
                styles.waitForLoadingButtonText
                }>
                    {microphoneChecked && internetAccessChecked && faceIDChecked && cameraChecked?
                    "Start Insurance Application":
                    "Wait for the checks to complete"}
            </Text>
        </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 20,
    },
    backButton: {
        marginTop: 50,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    backButtonText: {
        fontSize: 30,
        color: '#FFF',
    },
    title: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 24,
        marginVertical: 20,
        marginTop: 50,
    },
    phoneInfo: {
        alignItems: 'center',
        marginVertical: 10,
    },
    phoneImage: {
        width: 120,
        height: 120,
        marginBottom: 10,
        borderRadius: 120,
    },
    phoneName: {
        fontSize: 36,
        color: '#FFF',
        fontWeight: 'bold',
    },
    phoneNumber: {
        fontSize: 16,
        marginTop: 5,
        color: '#49ff8f',
    },
    hardwareChecks: {
        marginTop: 15,

    },
    hardwareCheckItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        padding: 10,
        borderRadius: 10,
        marginVertical: 7,
        paddingVertical: 20,
    },
    hardwareCheckIcon: {
        fontSize: 24,
        color: '#FFF',
    },
    hardwareCheckLabel: {
        fontSize: 20,
        color: '#FFF',
        flex: 1,
        marginLeft: 15,
    },
    hardwareCheckStatus: {
        fontSize: 24,
        color: '#00FF00',
    },
    startInsuranceButton: {
        backgroundColor: '#1E90FF',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    startInsuranceButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    waitForLoadingButton: {
        backgroundColor: '#a1a1a1',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    waitForLoadingButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export { NewInsuranceScreen };

