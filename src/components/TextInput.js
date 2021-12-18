import React, {memo, useCallback, useContext} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from 'react-native';
import Colors from '../constants/colors';
import Text from './Text';
import {BottomSheetInternalContext} from '@gorhom/bottom-sheet/src/contexts/internal';

type Props = {
  errorMessage?: string,
  isNormal?: boolean,
} & TextInputProps;

const TextInput = memo(
  ({errorMessage, onFocus, onBlur, isNormal = true, ...props}: Props) => {
    const context = useContext(BottomSheetInternalContext);

    const handleOnFocus = useCallback(
      args => {
        if (context) {
          context.shouldHandleKeyboardEvents.value = true;
        }
        if (onFocus) {
          onFocus(args);
        }
      },
      [onFocus, context],
    );
    const handleOnBlur = useCallback(
      args => {
        if (context) {
          context.shouldHandleKeyboardEvents.value = false;
        }
        if (onBlur) {
          onBlur(args);
        }
      },
      [onBlur, context],
    );

    return (
      <>
        <RNTextInput
          {...props}
          placeholderTextColor={Colors.gray}
          style={textInputStyle.textInput}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
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
  },
);

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
