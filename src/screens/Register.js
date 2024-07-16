/*eslint-disable*/
import React from 'react';
import {StyleSheet, View} from 'react-native';

import OnboardingModal from '../components/OnboardingModal';
import SignUp from './SignUp';

const Register = () => {
  return (
    <View style={{flex: 1}}>
      <OnboardingModal />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
