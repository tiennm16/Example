import React from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import Animated, {
  Value,
  Clock,
  Easing,
  interpolateColors,
  Node,
  useCode,
  set,
  cond,
  startClock,
  clockRunning,
  block,
  timing,
  debug,
  stopClock,
  call,
  diff,
} from 'react-native-reanimated';
import {PickerItem} from './PickerItem';
import {PickerItemInfo} from './type';

function runTiming(
  clock: Clock,
  value: Node<number> | number,
  dest: Node<number> | number,
  completion?: () => void,
): Animated.Node<number> {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 300,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    cond(
      diff(state.finished),
      call([state.finished], ([finished]) => {
        finished && completion && completion();
      }),
    ),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

export interface BottomSheetPickerProps {
  data: PickerItemInfo[];
  visible: boolean;
  selectedId: string;
  /**
   * @callback fire when user request close modal
   */
  onRequestClose: () => void;

  onSelect: (item: PickerItemInfo) => void;
}

export const BottomSheetPicker: React.FC<BottomSheetPickerProps> = (props) => {
  const {visible, data, onRequestClose, onSelect, selectedId} = props;
  const transition = React.useRef(new Value<number>()).current;

  const [modalVisible, setModalVisible] = React.useState(visible);

  React.useEffect(() => {
    visible && setModalVisible(visible);
  }, [visible]);

  useCode(() => {
    const start = visible ? 0 : 1;
    const dest = visible ? 1 : 0;
    const completion = () => {
      visible || setModalVisible(false);
    };
    return set(transition, runTiming(new Clock(), start, dest, completion));
  }, [visible]);

  const backgroundColor = interpolateColors(transition, {
    inputRange: [0, 1],
    outputColorRange: ['rgba(51,51,51, 0)', 'rgba(51,51,51, 0.6)'],
  });

  const contentTranslateY = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [350, 0],
  });

  const renderHeader = () => {
    return (
      <Animated.View style={styles.header}>
        <Text>Back</Text>
        <Text style={styles.title}>Pick any thing</Text>
        <Animated.Text onPress={onRequestClose}>Close</Animated.Text>
      </Animated.View>
    );
  };

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

  const renderOptions = () => {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    );
  };

  return (
    <Modal
      presentationStyle="overFullScreen"
      visible={modalVisible}
      animationType="none"
      statusBarTranslucent
      transparent>
      <Pressable style={styles.back} onPress={onRequestClose}>
        <Animated.View style={[styles.container, {backgroundColor}]}>
          <Animated.View
            style={[
              styles.content,
              {transform: [{translateY: contentTranslateY}]},
            ]}>
            {renderHeader()}
            {renderOptions()}
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Modal>
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
    height: 350,
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
