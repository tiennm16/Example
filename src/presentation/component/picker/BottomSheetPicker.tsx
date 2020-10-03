import React from 'react';
import {StyleSheet, Modal, Pressable, Text} from 'react-native';

import Ripple from 'react-native-material-ripple';
import Animated from 'react-native-reanimated';

import {PickerContent} from './PickerContent';
import {PickerItemInfo} from './type';
import {useBottomSheetAnimation} from './animation';
import {SearchBar} from 'react-native-elements';

export interface BottomSheetPickerProps {
  title: string;
  data: PickerItemInfo[];
  selectedId: string;

  onSelect: (item: PickerItemInfo) => void;
}

export const BottomSheetPicker: React.FC<BottomSheetPickerProps> = (props) => {
  const {title, data, selectedId, onSelect} = props;
  const {
    toggle,
    toggleSize,
    sheetHeight,
    modalVisible,
    backgroundColor,
    contentTranslateY,
  } = useBottomSheetAnimation();

  const onSelectItem = React.useCallback(
    (item: PickerItemInfo) => {
      onSelect(item);
      toggle();
    },
    [onSelect, toggle],
  );

  const renderHeader = () => {
    return (
      <>
        <Animated.View style={styles.header}>
          <Text>Back</Text>
          <Text style={styles.title}>{title}</Text>
          <Animated.Text onPress={toggle}>Close</Animated.Text>
        </Animated.View>
        <SearchBar onFocus={toggleSize} onBlur={toggleSize} />
      </>
    );
  };

  const renderContent = () => {
    return (
      <Animated.View
        style={[
          styles.content,
          {height: sheetHeight, transform: [{translateY: contentTranslateY}]},
        ]}>
        {renderHeader()}
        <PickerContent
          data={data}
          selectedId={selectedId}
          onSelect={onSelectItem}
        />
      </Animated.View>
    );
  };

  return (
    <>
      <Modal
        presentationStyle="overFullScreen"
        visible={modalVisible}
        animationType="none"
        statusBarTranslucent
        transparent>
        <Pressable style={styles.back} onPress={toggle}>
          {/* @ts-ignore */}
          <Animated.View style={[styles.container, {backgroundColor}]}>
            {renderContent()}
          </Animated.View>
        </Pressable>
      </Modal>
      <Ripple onPress={toggle}>{props.children}</Ripple>
    </>
  );
};

const styles = StyleSheet.create({
  back: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  title: {
    fontWeight: 'bold',
  },
});
