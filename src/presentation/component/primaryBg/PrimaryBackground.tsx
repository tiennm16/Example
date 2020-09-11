import React from 'react';
import {StyleSheet, StatusBar, ImageBackground} from 'react-native';
import {BACKGROUND} from '@assets';

export interface PrimaryBackgroundProps {}

const _PrimaryBackground: React.FC<PrimaryBackgroundProps> = (props) => {
  const {children} = props;
  return (
    <ImageBackground source={BACKGROUND} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const PrimaryBackground = React.memo(_PrimaryBackground);
