/*eslint-disable*/
import React from 'react';
import {StatusBar, StyleSheet,KeyboardAvoidingView, Platform} from 'react-native';
import Navigation from './src/navigation';

function App() {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
    >
    
      <StatusBar
        backgroundColor="transparent"
        translucent
      />
      <Navigation />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});

export default App;
