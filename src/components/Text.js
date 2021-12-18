// @flow
import React, {memo} from 'react';
import {StyleSheet, Text as RNText, TextProps} from 'react-native';
import Colors from '../constants/colors';

type Props = {
  bold?: boolean,
  bolder?: boolean,
  heavy?: boolean,
  light?: boolean,
  lighter?: boolean,
  size?: number,
  color?: string,
} & TextProps;

const Text = memo(
  ({
    bold,
    bolder,
    heavy,
    light,
    lighter,
    size = 14,
    color = Colors.blueDeep,
    ...props
  }: Props) => {
    return (
      <RNText
        {...props}
        style={[
          textStyles.text,
          bold && textStyles.bold,
          bolder && textStyles.bolder,
          heavy && textStyles.heavy,
          light && textStyles.light,
          lighter && textStyles.lighter,
          {
            color: color,
            fontSize: size,
            lineHeight: size + 10,
          },
        ]}
      />
    );
  },
);

const textStyles = StyleSheet.create({
  text: {},
  bold: {
    fontWeight: '500',
  },
  bolder: {
    fontWeight: '600',
  },
  heavy: {
    fontWeight: '700',
  },
  light: {
    fontWeight: '200',
  },
  lighter: {
    fontWeight: '100',
  },
});

export default Text;
