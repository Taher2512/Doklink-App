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
        initialRouteName={'BottomTabNavigation'}>
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
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
        <Stack.Screen name="otpVerification" component={OtpVerification} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='doctorbooking' component={DoctorBooking}/>
        <Stack.Screen name='bedbooking' component={BedBooking}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
