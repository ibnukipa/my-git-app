import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../constants/colors';

const useBackdropBS = () => {
  const renderBackdrop = useCallback(
    props => <View style={backdropStyle.container} />,
    [],
  );

  return {renderBackdrop};
};

const backdropStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.black20,
    ...StyleSheet.absoluteFill,
  },
});

export default useBackdropBS;
