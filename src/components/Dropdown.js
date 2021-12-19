import React, {memo, useState} from 'react';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';
import {StyleSheet} from 'react-native';
import Colors from '../constants/colors';

DropDownPicker.setListMode('SCROLLVIEW');

type Props = {
  width?: number,
} & DropDownPickerProps;

const Dropdown = memo(({width = 150, ...props}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <DropDownPicker
      {...props}
      props={{activeOpacity: 0.6}}
      scrollViewProps={{
        keyboardShouldPersistTaps: 'handled',
        bounces: false,
        bouncesZoom: false,
        showsVerticalScrollIndicator: false,
      }}
      showTickIcon={false}
      open={open}
      setOpen={setOpen}
      style={[dropdownStyle.container, {width}]}
      dropDownContainerStyle={[dropdownStyle.optionsContainer, {width}]}
      listItemContainerStyle={dropdownStyle.option}
      selectedItemContainerStyle={dropdownStyle.selectedOption}
      selectedItemLabelStyle={dropdownStyle.selectedOptionText}
      disabledItemLabelStyle={dropdownStyle.optionDisabled}
      labelStyle={dropdownStyle.text}
    />
  );
});

const dropdownStyle = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderWidth: 2,
    borderColor: Colors.blueLighter,
    padding: 0,
    borderRadius: 8,
    height: 35,
  },
  text: {
    color: Colors.blueDeep,
  },
  optionsContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.blueLighter,
    borderWidth: 2,
    borderTopWidth: 0,
  },
  option: {
    height: undefined,
    paddingVertical: 5,
    marginVertical: 2,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  optionDisabled: {
    color: Colors.grey,
  },
  selectedOption: {
    backgroundColor: Colors.blue,
  },
  selectedOptionText: {
    fontWeight: '600',
    color: Colors.white,
  },
});

export default Dropdown;
