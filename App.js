/*eslint-disable*/
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  
  return (
    
    <View style={{flex:1}}>
      <StatusBar
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
      <BottomTabNavigation/>
      </NavigationContainer>
      {/* <Navigation/> */}
      
      </View>
  );
}

const styles = StyleSheet.create({})

export default App;
