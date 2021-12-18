import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

const LoginStack = createStackNavigator();

const LoginRoute = () => {
  return (
    <LoginStack.Navigator screenOptions={{headerShown: false}}>
      <LoginStack.Screen name={'Login'} component={LoginScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginRoute;
