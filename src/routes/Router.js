import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginRoute from './LoginRoute';
import AppRoute from './AppRoute';

const RootStack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name={'LoginRoute'} component={LoginRoute} />
        <RootStack.Screen name={'AppRoute'} component={AppRoute} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
