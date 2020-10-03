import React from 'react';
import {ListRenderItemInfo, FlatList, StyleSheet} from 'react-native';

import {PickerItem} from './PickerItem';
import {PickerItemInfo} from './type';

export interface PickerContentProps {
  data: PickerItemInfo[];
  selectedId?: string;

  onSelect: (item: PickerItemInfo) => void;
}

export const PickerContent: React.FC<PickerContentProps> = (props) => {
  const {data, selectedId, onSelect} = props;

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<PickerItemInfo>) => {
      return (
        <PickerItem
          item={item}
          checked={item.id === selectedId}
          onPress={onSelect}
        />
      );
    },
    [onSelect, selectedId],
  );

  const keyExtractor = React.useCallback(
    (item: PickerItemInfo) => `${item.id}`,
    [],
  );

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
