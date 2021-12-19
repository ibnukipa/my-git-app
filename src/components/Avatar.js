import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import Colors from '../constants/colors';

type Props = {
  size?: number,
  borderless?: boolean,
  onPress?: Function,
  source?: ImageSourcePropType,
};

const Avatar = ({size = 30, borderless = true, onPress, source}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} disabled={!onPress} onPress={onPress}>
      <Image
        borderRadius={size}
        style={[!borderless && avatarStyle.border, {width: size, height: size}]}
        source={source}
        resizeMode={'cover'}
      />
    </TouchableOpacity>
  );
};

const avatarStyle = StyleSheet.create({
  border: {
    borderWidth: 2,
    borderColor: Colors.white,
  },
});

export default Avatar;
