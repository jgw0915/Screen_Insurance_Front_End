import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { insured_phone, userData } from '../../data/data';
import { CameraInstructionScreen } from '../../Screens/CameraInstruction';
import { DashBoardScreen } from '../../Screens/DashBoard';
import { InsuranceDetailScreen } from '../../Screens/Detail';
import { EditProfileScreen } from '../../Screens/EditProfile';
import { HomeScreen } from '../../Screens/Home';
import { NewInsuranceScreen } from '../../Screens/NewInsurance';
import { RegisterScreen } from '../../Screens/Register';
import { ScreenBrokenDetectScreen } from '../../Screens/ScreenBrokenDetect';
import { SignInScreen } from '../../Screens/SignIn';
import { UserProfileScreen } from '../../Screens/UserProfile';

export type rootStackParams = {
    Home: undefined,
    Register: undefined,
    SignIn: undefined,
    DashBoard: {
      userData : userData;
    }
    InsuranceDetail : {
      userData : userData;
      phone_data : insured_phone;
    },
    UserProfile:{
      userData : userData;
    },
    EditProfile : {
      userData : userData;
    }
    NewInsurance: {
      phoneNumber : string;
      phoneType : "IPhone" | "Android";
      phoneName : string;
      userData : userData;
    },
    CameraInstruction: {
      phoneNumber : string;
      phoneType : "IPhone" | "Android";
      phoneName : string;
      userData : userData;
    }
    ScreenBrokenDetect : {
      phoneNumber : string;
      phoneType : "IPhone" | "Android";
      phoneName : string;
      userData : userData;
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
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="NewInsurance" component={NewInsuranceScreen} />
        <Stack.Screen name="CameraInstruction" component={CameraInstructionScreen} />
        <Stack.Screen name="ScreenBrokenDetect" component={ScreenBrokenDetectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { LoginStackNavigator };
