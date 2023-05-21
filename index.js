/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import React from 'react';
import configureStore from './store';
const store = configureStore();

const RNRedux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

YellowBox.ignoreWarnings(['Warning: ...']);

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => RNRedux);
