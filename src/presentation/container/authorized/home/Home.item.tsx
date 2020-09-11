import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';

export type UnSplashItemProps = {
  item: string;
};
export const UnSplashItem: React.FC<UnSplashItemProps> = (props) => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: item}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').width * 1.2,
    marginBottom: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
});
