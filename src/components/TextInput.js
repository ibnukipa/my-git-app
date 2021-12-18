import React, {memo} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';
import Colors from '../constants/colors';

type Props = {} & TextInputProps;

const TextInput = memo(({...props}: Props) => {
  return (
    <RNTextInput
      {...props}
      placeholderTextColor={Colors.gray}
      style={textInputStyle.textInput}
    />
  );
});

const textInputStyle = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.blueLighter,
    height: 50,
    marginVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 20,
    color: Colors.blueDeep,
  },
});

export default TextInput;
