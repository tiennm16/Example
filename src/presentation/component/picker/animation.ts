import React from 'react';
import {useWindowDimensions} from 'react-native';
import Animated, {
  Value,
  Clock,
  Easing,
  Node,
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
  useCode,
  interpolateColors,
} from 'react-native-reanimated';

export function runTiming(
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

export function useBottomSheetAnimation() {
  const {height} = useWindowDimensions();
  const transition = React.useRef(new Value<number>()).current;
  const sheetHeight = React.useRef(new Value<number>(height * 0.4)).current;

  const [visible, setVisible] = React.useState(false);
  const [fullSize, setFullSize] = React.useState(false);
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

  useCode(() => {
    const start = fullSize ? height * 0.4 : height;
    const dest = fullSize ? height : height * 0.4;
    return set(sheetHeight, runTiming(new Clock(), start, dest));
  }, [fullSize]);

  const backgroundColor = interpolateColors(transition, {
    inputRange: [0, 1],
    outputColorRange: ['rgba(51,51,51, 0)', 'rgba(51,51,51, 0.6)'],
  });

  const contentTranslateY = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const toggle = React.useCallback(() => {
    setVisible(!visible);
  }, [setVisible, visible]);

  const toggleSize = React.useCallback(() => {
    setFullSize(!fullSize);
  }, [fullSize]);

  return {
    visible,
    setVisible,
    toggle,
    sheetHeight,
    toggleSize,
    setFullSize,
    modalVisible,
    backgroundColor,
    contentTranslateY,
  };
}
