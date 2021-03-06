import {StyleSheet} from 'react-native';
import Colors from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.greyLighter,
  },
  containerWhite: {
    backgroundColor: Colors.white,
  },
  middle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
