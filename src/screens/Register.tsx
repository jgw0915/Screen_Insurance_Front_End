import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RegisterTextInput } from '../Components/RegisterTextInput';
import { rootStackParams } from '../Navigator/stack/StackNavigator';
import { initUserData } from '../data/data';

const { height, width } = Dimensions.get('window');
type props = NativeStackScreenProps<rootStackParams, 'Register'>;


export const handleImageUpload = async (userData: any, setUserData:any) => {
  Alert.alert(
    'Upload Image',
    'Choose an option',
    [
      {
        text: 'Camera',
        onPress: async () => {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
          });
          if (!result.canceled) {
            setUserData({
              ...userData,
              profileImage: result.assets[0].uri,
            });
          }
        },
      },
      {
        text: 'Album',
        onPress: async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
          });
          if (!result.canceled) {
            setUserData({
              ...userData,
              profileImage: result.assets[0].uri,
            });
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ],
    { cancelable: true }
  );
};


const RegisterScreen = ( { navigation } : props ) => {
  const [userData, setUserData] = useState(initUserData);

  const handleUserInput = (label: string, value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" >
        <Image
            source={require('@assets/register-background.png')}
            style={styles.image}
        />
        <Text style={styles.header}>Register</Text>
        <TouchableOpacity onPress={() => handleImageUpload(userData, setUserData)} style={styles.profile_image_button}>
          <Image
            source={
              userData.profileImage
                ? { uri: userData.profileImage }
                : require('@assets/profile-placeholder.png')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileText}>Your Profile</Text>
        <Text style={styles.subText}>
          Tap the avatar to upload your avatar
        </Text>
        <RegisterTextInput
          styles={styles.input}
          label="username"
          placeholder="YOUR NAME"
          value={userData.username}
          onChangeText={handleUserInput}
        />
        <RegisterTextInput
          styles={styles.input}
          label='phoneNumber'
          placeholder="YOUR PHONE NUMBER"
          value={userData.phoneNumber}
          keyboardType="phone-pad"
          onChangeText={handleUserInput}
          returnKeyType="go"
        />
        <RegisterTextInput
          styles={styles.input}
          label='password'
          placeholder="YOUR PASSWORD"
          value={userData.password}
          secureTextEntry={true}
          onChangeText={handleUserInput}
          returnKeyType="go"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={()=> navigation.navigate("SignIn")}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate("DashBoard",{userData})} style={styles.doneButton}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  image: {
    width: width,
    height: height,
    alignSelf: 'flex-start',
    
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#d9dbdd',
    height: 60,
    top: -700,
    left: 120,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profile_image_button : {
    backgroundColor: 'transparent',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    top: height / 100-700,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
    left: 100,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: height / 4 - 900,
  },
  subText: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 20,
    left: 80,
    top: height / 4 -900,
  },
  input: {
    width: '95%',
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: height / 4  - 900,
    color: '#141413',
    marginLeft: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    top: height / 3 -900,
  },
  skipButton: {
    backgroundColor: '#BBBBBB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    height: 50,
  },
  doneButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    height: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export { RegisterScreen };
