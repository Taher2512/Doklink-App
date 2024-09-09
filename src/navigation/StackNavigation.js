/*eslint-disable*/
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import Register from '../screens/Register';
import Login from '../screens/Login';
import BottomTabNavigation from './BottomTabNavigation';
import OtpVerification from '../screens/OtpVerification';
import SignIn from '../screens/SignIn';
import Onboarding from '../screens/Onboarding';
import Home from '../screens/Home';
import BedBooking from '../screens/BedBooking';
import DoctorBooking from '../screens/DoctorBooking';
import HospitalInfo from '../screens/HospitalInfo';
import DoctorInfo from '../screens/DoctorInfo';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import DoctorAppointment from '../screens/DoctorAppointment';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
        initialRouteName={'Onboarding'}>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BedBooking"
          component={BedBooking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HospitalInfo"
          component={HospitalInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="DoctorAppointment" component={DoctorAppointment} />
        <Stack.Screen
          name="DoctorInfo"
          component={DoctorInfo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
