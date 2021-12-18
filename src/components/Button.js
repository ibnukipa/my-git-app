import React, {memo} from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import Colors from '../constants/colors';
import Text from './Text';

type Props = {
  label: string,
};

const Button = memo(({label}: Props) => {
  return (
    <TouchableHighlight style={buttonStyle.container}>
      <Text size={20} bolder color={Colors.white}>
        {label}
      </Text>
    </TouchableHighlight>
  );
});

const buttonStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default Button;
