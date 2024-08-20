import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ImageButton } from '../Components';
import { EditProfileTextInput } from '../Components/EditProfileTextInput';
import { rootStackParams } from '../Navigator/stack/StackNavigator';
import { handleImageUpload } from './Register';

type props = NativeStackScreenProps<rootStackParams, 'EditProfile'>;


const EditProfileScreen : React.FC<props> = ({navigation, route}: props) => {
    const [userData, setUserData] = useState(route.params.userData);

    const handleUserInput = (label: string, value: string) => {
        setUserData((prevState) => ({
        ...prevState,
        [label]: value,
        }));
    };


    const handleUpdateProfile = () => {
        // Add logic to update the profile, then navigate back
        navigation.dispatch(
            CommonActions.reset({
            index: 0,
              routes: [{ name: 'DashBoard',  params: {userData: userData}} ],  // Replace 'Home' with the screen you want to navigate to
            }))
        Alert.alert('Profile updated', 'Your profile has been successfully updated.');
    };

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container}  >

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>{'<'}</Text>
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Edit Profile</Text>

            {/* Profile Image Section */}
            <ImageButton
                image_uri={userData.profileImage}
                onPress={() => handleImageUpload(userData, setUserData)}
            />

            {/* Edit Name */}
            <EditProfileTextInput
                Text_Label='Your Name'
                label = "username"
                value={userData.username}
                onChangeText={handleUserInput}
                placeholder=""
            />

            {/* Edit Phone */}
            <EditProfileTextInput
                Text_Label='Your Phone'
                label = "phoneNumber"
                value={userData.phoneNumber}
                onChangeText={handleUserInput}
                placeholder=""
                keyboardType="phone-pad"
            />

            {/* Update Button */}
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
                <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
    },
    backButton: {
        marginTop: 50,
        borderRadius: 50,
    },
    backButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginVertical: 20,
    },
    imageContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    input: {
        backgroundColor: '#1c1c1c',
        color: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        fontSize: 14,
    },
    updateButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 250,
        marginBottom: 40,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    });

export { EditProfileScreen };

