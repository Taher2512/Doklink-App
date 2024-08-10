/*eslint-disable*/
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
