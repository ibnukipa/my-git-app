import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import styles from '../constants/styles';
import SearchInput from '../components/SearchInput';
import Button from '../components/Button';

const DashboardScreen = () => {
  return (
    <View style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={dashboardStyle.container}>
        <SearchInput
          autoFocus={false}
          value={'facebook/react-native'}
          placeholder={'Search'}
        />
        <Button compact label={'Search'} />
      </KeyboardAvoidingView>
    </View>
  );
};

const dashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
});

export default DashboardScreen;
