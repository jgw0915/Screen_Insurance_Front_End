import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { insured_phone, userData } from '../../data/Type/data_type';
import { ChosePlanScreen } from '../../Screens/ChosePlan';
import { DashBoardScreen } from '../../Screens/DashBoard';
import { InsuranceDetailScreen } from '../../Screens/Detail';
import { EditProfileScreen } from '../../Screens/EditProfile';
import { HomeScreen } from '../../Screens/Home';
import { NewInsuranceScreen } from '../../Screens/NewInsurance';
import { OptionInsuranceScreen } from '../../Screens/OptionInsurance';
import { RegisterScreen } from '../../Screens/Register';
import { ScreenBrokenDetectScreen } from '../../Screens/ScreenBrokenDetect';
import { ScreenBrokenDetectResultScreen } from '../../Screens/ScreenBrokenDetectResult';
import { SignInScreen } from '../../Screens/SignIn';
import { UserProfileScreen } from '../../Screens/UserProfile';

export type rootStackParams = {
    Home: undefined,
    Register: undefined,
    SignIn: undefined,
    DashBoard: {
      userData : userData;
    },
    InsuranceDetail : {
      userData : userData;
      phone_data : insured_phone;
    },
    UserProfile:{
      userData : userData;
    },
    EditProfile : {
      userData : userData;
    },
    NewInsurance: {
      phoneNumber : string;
      phoneType : "IPhone" | "Android";
      phoneName : string;
      userData : userData;
    },
    ScreenBrokenDetect: {
      phoneNumber : string;
      phoneType : "IPhone" | "Android";
      phoneName : string;
      userData : userData;
    },
    ScreenBrokenDetectResult : {
      phoneNumber : string;
      phoneType : "IPhone" | "Android";
      phoneName : string;
      userData : userData;
      takenPhoto : string | undefined;
    },
    OptionInsurance : {
      phoneNumber : string;
      phoneType : "IPhone" | "Android";
      phoneName : string;
      userData : userData;
    },
    ChosePlan : {
      phoneNumber : string;
      phoneType : "IPhone" | "Android";
      phoneName : string;
      userData : userData;
    },
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
        <Stack.Screen name="ScreenBrokenDetect" component={ScreenBrokenDetectScreen} />
        <Stack.Screen name="ScreenBrokenDetectResult" component={ScreenBrokenDetectResultScreen} />
        <Stack.Screen name="OptionInsurance" component={OptionInsuranceScreen} />
        <Stack.Screen name="ChosePlan" component={ChosePlanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { LoginStackNavigator };

