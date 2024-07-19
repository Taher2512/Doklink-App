/*eslint-disable*/
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation';

function App() {
  
  return (
    
    <View style={{flex:1}}>
      <StatusBar
        backgroundColor="transparent"
        translucent
      />
      <Navigation/>
      </View>
  );
}

const styles = StyleSheet.create({})

export default App;
