import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Navigation from './src/navigation';

function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
