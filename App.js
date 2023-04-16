import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigation from './navigation/appNavigation';
import { store } from './redux/store';

 function App() {
  return (
    <Provider store={store}>
  <AppNavigation />
    </Provider>
 
  );
}
export default App;

