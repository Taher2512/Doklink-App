/*eslint-disable*/
import React from 'react';
import {StyleSheet, View} from 'react-native';

import OnboardingModal from '../components/OnboardingModal';
import Signup from './Signup';

const Register = () => {
  return (
    <View style={{flex:1}}>
      {/* <OnboardingModal /> */}
      <Signup/>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
