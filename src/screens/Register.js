/*eslint-disable*/
import React from 'react';
import {StyleSheet, View} from 'react-native';

import OnboardingModal from '../components/OnboardingModal';
import Home from './Home';
import BottomTabNavigation from '../navigation/BottomTabNavigation';

const Register = () => {
  return (
    <View className="flex-1">
      <OnboardingModal />
      {/* <BottomTabNavigation/> */}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
