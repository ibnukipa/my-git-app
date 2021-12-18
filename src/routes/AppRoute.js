import React, {useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import {StatusBar, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import {useDispatch} from 'react-redux';
import {logout} from '../states/reducers/auth';

const AppStack = createStackNavigator();

const AppHeader = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const logoutPress = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <View style={[appRouteStyle.headerContainer, {paddingTop: insets.top}]}>
      <Text onPress={logoutPress} color={Colors.white}>
        Logout
      </Text>
    </View>
  );
};

const AppRoute = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <AppStack.Navigator
        screenOptions={{
          header: props => <AppHeader {...props} />,
          headerShadowVisible: true,
        }}>
        <AppStack.Screen name={'Dashboard'} component={DashboardScreen} />
      </AppStack.Navigator>
    </>
  );
};

const appRouteStyle = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginBottom: 20,
    shadowOpacity: 0.15,
    shadowColor: Colors.black20,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },
});

export default AppRoute;
