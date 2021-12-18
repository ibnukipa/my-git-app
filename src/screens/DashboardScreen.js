import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import styles from '../constants/styles';

const DashboardScreen = () => {
  return (
    <View style={[styles.container]}>
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
