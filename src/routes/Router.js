import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginRoute from './LoginRoute';
import AppRoute from './AppRoute';
import {useSelector} from 'react-redux';
import {authStateSelector} from '../states/reducers/auth';

const RootStack = createStackNavigator();

const Router = () => {
  const authState = useSelector(authStateSelector);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}>
        {authState.isLoggedIn ? (
          <RootStack.Screen name={'AppRoute'} component={AppRoute} />
        ) : (
          <RootStack.Screen name={'LoginRoute'} component={LoginRoute} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
