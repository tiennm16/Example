import React from 'react';
import {ListRenderItemInfo, Pressable, View} from 'react-native';
// import from library
import Image from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
// import from alias
import {ListView, TextView} from '@components';
import {withHotEnhanceRedux} from '@hocs';
// localImport
import {useProfileModel} from './Profile.hooks';
import {ProfileProps} from './types';
import {styles} from './Profile.style';
import {hotProfileRedux} from './Profile.slice';
import {UnsplashUser} from '@data';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const _Profile: React.FC<ProfileProps> = (props) => {
  const {actions, selector, route, navigation} = props;
  const {isLoading, avatar, friends, isLoadingFriend, name} = useProfileModel(
    actions,
    selector,
    route.params.id,
  );
  const navigateToFriendProfile = React.useCallback(
    (item: UnsplashUser) => () => {
      navigation.push('Profile', {id: item.username});
    },
    [navigation],
  );

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<UnsplashUser>) => {
      return (
        <Pressable onPress={navigateToFriendProfile(item)}>
          <Image
            style={styles.friendImage}
            source={{uri: item.profile_image.large}}
          />
        </Pressable>
      );
    },
    [navigateToFriendProfile],
  );

  const keyExtractor = React.useCallback((item: UnsplashUser) => item.id, []);

  const renderHeader = () => {
    if (isLoading) {
      return (
        <SkeletonPlaceholder>
          <Image style={styles.avatar} source={{uri: avatar}} />
          <SkeletonPlaceholder.Item
            margin={20}
            height={20}
            borderRadius={10}
            width={200}
          />
        </SkeletonPlaceholder>
      );
    }
    return (
      <>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <TextView style={styles.name} text={name} />
      </>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ListView
        numColumns={3}
        style={styles.listView}
        ListHeaderComponent={renderHeader()}
        refreshing={isLoadingFriend}
        showsVerticalScrollIndicator={false}
        LoadingComponent={
          <>
            <SkeletonPlaceholder>
              <View style={styles.row}>
                <View style={styles.friendImage} />
                <View style={styles.friendImage} />
                <View style={styles.friendImage} />
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={styles.row}>
                <View style={styles.friendImage} />
                <View style={styles.friendImage} />
                <View style={styles.friendImage} />
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={styles.row}>
                <View style={styles.friendImage} />
                <View style={styles.friendImage} />
                <View style={styles.friendImage} />
              </View>
            </SkeletonPlaceholder>
          </>
        }
        stickyHeaderIndices={[0]}
        data={friends}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export const Profile = withHotEnhanceRedux(hotProfileRedux)(_Profile);
