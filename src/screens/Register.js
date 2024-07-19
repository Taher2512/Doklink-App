/*eslint-disable*/
import React from 'react';
import {StyleSheet, View} from 'react-native';

import OnboardingModal from '../components/OnboardingModal';
import Home from './Home';

const Register = () => {
  return (
    <View className="flex-1">
      {/* <OnboardingModal /> */}
      <Home />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
