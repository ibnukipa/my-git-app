import React, {useCallback} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import {useSelector} from 'react-redux';
import {profileSelector} from '../states/reducers/auth';
import ProfileScreen from '../screens/ProfileScreen';
import Avatar from '../components/Avatar';
import CommitScreen from '../screens/CommitScreen';

const AppStack = createStackNavigator();

const AppHeader = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const profile = useSelector(profileSelector);

  const profilePress = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <View
      style={[
        appRouteStyle.headerContainer,
        {paddingTop: insets.top + Platform.select({ios: 0, android: 10})},
      ]}>
      <View style={appRouteStyle.headerContentContainer}>
        <Text size={24} heavy color={Colors.white} numberOfLines={1}>
          {route.params?.title || route.name}
        </Text>
        <Avatar
          borderless={false}
          onPress={profilePress}
          source={{uri: profile.avatar_url}}
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
          gestureEnabled: true,
          cardShadowEnabled: true,
          cardOverlayEnabled: true,
        }}>
        <AppStack.Screen
          name={'Dashboard'}
          title={'Dashboard'}
          component={DashboardScreen}
        />
        <AppStack.Screen
          name={'Commit'}
          component={CommitScreen}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <AppStack.Screen
          name={'Profile'}
          component={ProfileScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
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
});

export default AppRoute;
