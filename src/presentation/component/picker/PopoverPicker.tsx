import React from 'react';
import {View, StyleSheet} from 'react-native';

export interface PopoverPickerProps {}

export const PopoverPicker: React.FC<PopoverPickerProps> = (props) => {
  return <View style={StyleSheet.flatten([styles.container])}></View>;
};

const styles = StyleSheet.create({
  container: {},
});
