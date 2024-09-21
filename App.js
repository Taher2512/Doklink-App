/*eslint-disable*/
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';

function App() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
