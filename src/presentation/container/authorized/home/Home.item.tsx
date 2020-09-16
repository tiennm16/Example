import React from 'react';
import {StyleSheet, View, Dimensions, Pressable} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SharedElement} from 'react-navigation-shared-element';
import Image from 'react-native-fast-image';

import {UnsplashPhoto} from '@data';

export type UnSplashItemProps = {
  item: UnsplashPhoto;
  onPress?: (item: UnsplashPhoto) => void;
};
const _UnSplashItem: React.FC<UnSplashItemProps> = (props) => {
  const {item, onPress} = props;

  const onItemPress = React.useCallback(() => {
    onPress && onPress(item);
  }, [item, onPress]);

  return (
    <Pressable onPress={onItemPress} style={styles.container}>
      <Image style={styles.image} source={{uri: item.urls.regular}} />
      <View style={styles.overlay}>
        <View style={styles.row}>
          <SharedElement id={`avatar-${item.user.username}`}>
            <Image
              source={{uri: item.user.profile_image.medium}}
              style={styles.avatar}
            />
          </SharedElement>

          <View>{/* <TextView text={item.user.name} /> */}</View>
        </View>
      </View>
    </Pressable>
  );
};

export const UnsplashLoadingItem: React.FC = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.loadingContainer}>
        <View style={styles.row}>
          <View style={styles.avatar} />
          <View>
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              borderRadius={8}
              marginLeft={20}
            />
            <SkeletonPlaceholder.Item
              width={250}
              height={20}
              borderRadius={8}
              marginLeft={20}
              marginTop={8}
            />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').width * 1.2,
    marginBottom: 10,
  },
  loadingContainer: {
    height: Dimensions.get('window').width * 0.5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    justifyContent: 'flex-end',
    padding: 16,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const UnSplashItem = React.memo(_UnSplashItem);
