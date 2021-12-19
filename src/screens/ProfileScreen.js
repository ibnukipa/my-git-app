import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import styles from '../constants/styles';
import Text from '../components/Text';
import Avatar from '../components/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import {logout, profileSelector} from '../states/reducers/auth';
import Colors from '../constants/colors';
import Button from '../components/Button';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);

  const logoutPress = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <View style={[styles.container, profileStyle.container]}>
      <View style={profileStyle.headerContainer}>
        <Avatar source={{uri: profile.avatar_url}} size={80} />
        <View style={profileStyle.headerContent}>
          <Text size={24} heavy>
            {profile.name}
          </Text>
          <Text size={18} color={Colors.grey} bold>
            {profile.login}
          </Text>
          {profile.email && <Text size={14}>{profile.email}</Text>}
        </View>
      </View>
      <Button onPress={logoutPress} label={'Logout'} />
    </View>
  );
};

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    justifyContent: 'space-between',
  },
  headerContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    marginLeft: 20,
    justifyContent: 'center',
  },
});

export default ProfileScreen;
