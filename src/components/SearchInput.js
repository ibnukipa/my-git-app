import React, {memo} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';
import Colors from '../constants/colors';

const SearchInput = memo((props: TextInputProps) => {
  return (
    <RNTextInput
      {...props}
      placeholderTextColor={Colors.grey}
      style={searchInputStyle.textInput}
    />
  );
});

const searchInputStyle = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.greyLight,
    height: 35,
    marginVertical: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
    color: Colors.blueDeep,
  },
});

export default SearchInput;
