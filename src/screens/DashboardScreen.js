import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import styles from '../constants/styles';
import {useSelector} from 'react-redux';
import {authStateSelector} from '../states/reducers/auth';

const DashboardScreen = () => {
  const authState = useSelector(authStateSelector);

  return (
    <View style={[styles.container, dashboardStyle.container]}>
      <Text bolder size={24}>
        Dashboard
      </Text>
    </View>
  );
};

const dashboardStyle = StyleSheet.create({
  container: {},
});

export default DashboardScreen;
