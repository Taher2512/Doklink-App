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
import SignUp from '../screens/Signup';
import OtpVerification from '../screens/OtpVerification';

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
        initialRouteName={'Register'}>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
         <Stack.Screen
          name='otpVerification'
          component={OtpVerification}
        />
      </Stack.Navigator>
     
    </NavigationContainer>
  );
};

export default StackNavigation;
