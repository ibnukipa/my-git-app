import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';

const AppStack = createStackNavigator();

const AppRoute = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name={'Dashboard'} component={DashboardScreen} />
    </AppStack.Navigator>
  );
};

export default AppRoute;
