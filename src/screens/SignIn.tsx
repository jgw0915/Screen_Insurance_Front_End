import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';
import { fakeUserData } from '../data/Mock/user_data';

type props = NativeStackScreenProps<rootStackParams, 'SignIn'>;

const SignInScreen : React.FC<props> = ({ navigation } : props ) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userData] = useState(fakeUserData);

  const handleSignIn = async () => {
    // Replace this with your backend API call for authentication
    const isAuthenticated = await fakeAuthenticate(phoneNumber, password);
    if (isAuthenticated) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'DashBoard',  params: {userData: userData}} ],  // Replace 'Home' with the screen you want to navigate to
        })); // Replace 'NextPage' with your actual next screen
    } else {
      Alert.alert('Authentication Failed', 'Invalid phone number or password');
    }
  };

  // Fake authentication function, replace with actual API call
  const fakeAuthenticate = async (phone: string, pass: string) => {
    // Simulate an API call
    return phone === "1234" && pass === "1234";
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Verify your identity with credentials...</Text>

        <TextInput
            style={styles.input}
            placeholder="Your Phone Number"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
        />

        <TextInput
            style={styles.input}
            placeholder="Your Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#8B949E',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#161B22',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#238636',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { SignInScreen };
