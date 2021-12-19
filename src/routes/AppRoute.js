import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import {Platform, Image, StatusBar, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import {useSelector} from 'react-redux';
import {profileSelector} from '../states/reducers/auth';

const AppStack = createStackNavigator();

const AppHeader = () => {
  const insets = useSafeAreaInsets();
  const profile = useSelector(profileSelector);

  return (
    <View
      style={[
        appRouteStyle.headerContainer,
        {paddingTop: insets.top + Platform.select({ios: 0, android: 10})},
      ]}>
      <View style={appRouteStyle.headerContentContainer}>
        <Text size={24} heavy color={Colors.white}>
          MyGit
        </Text>
        <Image
          borderRadius={20}
          style={appRouteStyle.headerContentAvatar}
          source={{uri: profile.avatar_url}}
          resizeMode={'cover'}
        />
      </View>
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
  },
  headerContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContentAvatar: {
    borderWidth: 2,
    borderColor: Colors.white,
    height: 30,
    width: 30,
  },
});

export default AppRoute;
