import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox, Text} from 'react-native';
import MainStackNavigator from './src/screens/StackNavigator';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  console.log(App);
  return (
    <>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </>
  );
}
