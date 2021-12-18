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

const App: () => Node = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Colors.transparent}
        barStyle={'dark-content'}
      />
      <Router />
    </>
  );
};

export default App;
