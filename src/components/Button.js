import React, {memo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Colors from '../constants/colors';
import Text from './Text';

type Props = {
  label: string,
  isLoading?: boolean,
  compact?: boolean,
} & TouchableOpacityProps;

const Button = memo(
  ({label, disabled, isLoading, style, compact, ...props}: Props) => {
    return (
      <TouchableOpacity
        {...props}
        disabled={disabled}
        activeOpacity={0.6}
        style={[
          buttonStyle.container,
          compact && buttonStyle.compact,
          disabled && buttonStyle.disabledContainer,
          style,
        ]}>
        {isLoading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text size={compact ? 16 : 20} bolder color={Colors.white}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);

const buttonStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  disabledContainer: {
    backgroundColor: Colors.grey,
  },
  compact: {
    height: 40,
  },
});

export default Button;
