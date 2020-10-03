import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {PickerItemInfo} from './type';

export interface PickerItemProps {
  item: PickerItemInfo;
  checked: boolean;
  /**
   * @param item which is picked
   */
  onPress: (item: PickerItemInfo) => void;
}

export const PickerItem: React.FC<PickerItemProps> = (props) => {
  const {item, checked, onPress} = props;
  const onCheckBoxPress = React.useCallback(() => {
    onPress(item);
  }, [item, onPress]);
  return (
    <View style={StyleSheet.flatten([styles.container])}>
      <CheckBox
        onPress={onCheckBoxPress}
        containerStyle={styles.checkBoxContainer}
        title={item.title}
        checked={checked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
});
