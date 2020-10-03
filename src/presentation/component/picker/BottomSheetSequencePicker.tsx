import React from 'react';
import {
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  ListRenderItemInfo,
  View,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import Animated from 'react-native-reanimated';

import {PickerContent} from './PickerContent';
import {PickerItemInfo, SequencePickerData} from './type';
import {useBottomSheetAnimation} from './animation';
import {SearchBar} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

export interface BottomSheetSequencePickerProps {
  data: SequencePickerData[];
  selected: {[key in string]: string};
  onSelect: (item: PickerItemInfo, inSequence: SequencePickerData) => void;
}

export const BottomSheetSequencePicker: React.FC<BottomSheetSequencePickerProps> = (
  props,
) => {
  const {data, selected, onSelect} = props;
  const listRef = React.useRef<FlatList>(null);
  const list = listRef.current;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeScheme = data[activeIndex];

  const {
    visible,
    setVisible,
    toggleSize,
    sheetHeight,
    modalVisible,
    backgroundColor,
    contentTranslateY,
  } = useBottomSheetAnimation();
  const isStart = activeIndex === 0;

  React.useEffect(() => {
    if (activeIndex < 0 || activeIndex > data.length - 1) {
      return;
    }
    list?.scrollToIndex({index: activeIndex, animated: true});
  }, [activeIndex, data.length, list]);

  const toggle = React.useCallback(() => {
    setVisible(!visible);
    if (visible) {
      setActiveIndex(0);
    }
  }, [setVisible, visible]);

  const snapTo = React.useCallback(
    (direction: 'BACK' | 'FORWARD') => () => {
      if (direction === 'BACK' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
      if (direction === 'FORWARD' && activeIndex < data.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    },
    [activeIndex, data.length],
  );

  const onSelectItem = React.useCallback(
    (item: PickerItemInfo) => {
      onSelect(item, data[activeIndex]);
      if (activeIndex === data.length - 1) {
        return toggle();
      }
      setActiveIndex(activeIndex + 1);
    },
    [activeIndex, data, onSelect, toggle],
  );

  const renderHeader = () => {
    return (
      <>
        <Animated.View style={styles.header}>
          {isStart || <Text onPress={snapTo('BACK')}>Back</Text>}
          <Text style={styles.title}>{activeScheme.name}</Text>
          <Animated.Text onPress={toggle}>Close</Animated.Text>
        </Animated.View>
        <SearchBar onFocus={toggleSize} onBlur={toggleSize} platform="ios" />
      </>
    );
  };

  const renderFooter = () => {
    return (
      <Animated.View style={styles.footer}>
        <Text style={styles.title}>{`(${activeIndex + 1}/${
          data.length
        })`}</Text>
      </Animated.View>
    );
  };

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<SequencePickerData>) => {
      return (
        <View style={{width: Dimensions.get('window').width}}>
          <PickerContent
            data={item.data}
            selectedId={selected[activeScheme.name]}
            onSelect={onSelectItem}
          />
        </View>
      );
    },
    [activeScheme.name, onSelectItem, selected],
  );

  const keyExtractor = React.useCallback(
    (item: SequencePickerData) => `${item.name}`,
    [],
  );

  const renderContent = () => {
    return (
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.content,
            {height: sheetHeight, transform: [{translateY: contentTranslateY}]},
          ]}>
          <SafeAreaView style={styles.safeView}>
            {renderHeader()}
            <FlatList
              ref={listRef}
              data={data}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              bounces={false}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              removeClippedSubviews
            />
            {renderFooter()}
          </SafeAreaView>
        </Animated.View>
      </TouchableWithoutFeedback>
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
  safeView: {
    flex: 1,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
