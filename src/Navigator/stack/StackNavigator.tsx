import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { insured_phone, userData } from '../../data/data';
import { DashBoardScreen } from '../../screens/DashBoard';
import { InsuranceDetailScreen } from '../../screens/Detail';
import { HomeScreen } from '../../screens/Home';
import { RegisterScreen } from '../../screens/Register';
import { SignInScreen } from '../../screens/SignIn';

export type rootStackParams = {
    Home: undefined,
    Register: undefined,
    SignIn: undefined,
    DashBoard: {
      userData : userData;
    }
    InsuranceDetail : {
      phone_data : insured_phone;
    }
    };
    
const Stack = createStackNavigator<rootStackParams>();

const LoginStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="DashBoard" component={DashBoardScreen} />
        <Stack.Screen name="InsuranceDetail" component={InsuranceDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { LoginStackNavigator };
