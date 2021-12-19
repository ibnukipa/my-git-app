/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import Router from './src/routes/Router';
import Colors from './src/constants/colors';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/states/store';
import {PersistGate} from 'redux-persist/integration/react';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          translucent
          backgroundColor={Colors.transparent}
          barStyle={'dark-content'}
        />
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
