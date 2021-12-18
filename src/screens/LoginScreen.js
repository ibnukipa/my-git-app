import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import styles from '../constants/styles';
import Colors from '../constants/colors';

const LoginScreen = () => {
  return (
    <View style={[styles.container, loginStyle.container]}>
      <Text heavy size={28}>
        Sign-in
      </Text>
    </View>
  );
};

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});

export default LoginScreen;
