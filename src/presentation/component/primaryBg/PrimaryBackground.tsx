import React from 'react';
import { StyleSheet, Image, View, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '@resources';
import { BACKGROUND } from '@assets';

export interface PrimaryBackgroundProps { }

const _PrimaryBackground: React.FC<PrimaryBackgroundProps> = (props) => {
  const { children } = props;
  return (
    <View style={styles.container} >
      <StatusBar barStyle='dark-content' />
      <Image style={{ flex: 1, position: 'absolute' }} source={BACKGROUND} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const PrimaryBackground = React.memo(_PrimaryBackground);