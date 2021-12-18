import React, {memo} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from 'react-native';
import Colors from '../constants/colors';
import Text from './Text';

type Props = {
  errorMessage?: string,
} & TextInputProps;

const TextInput = memo(({errorMessage, ...props}: Props) => {
  return (
    <>
      <RNTextInput
        {...props}
        placeholderTextColor={Colors.gray}
        style={textInputStyle.textInput}
      />
      {errorMessage && (
        <View>
          <View style={textInputStyle.errorMessage}>
            <Text size={12} color={Colors.red}>
              {errorMessage}
            </Text>
          </View>
        </View>
      )}
    </>
  );
});

const textInputStyle = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.white,
    height: 50,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.blueLighter,
    fontSize: 20,
    color: Colors.blueDeep,
  },
  errorMessage: {
    position: 'absolute',
    right: 8,
    bottom: -20,
  },
});

export default TextInput;
