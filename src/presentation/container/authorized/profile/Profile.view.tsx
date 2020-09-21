import React from 'react';
import {ListRenderItemInfo, Pressable, View} from 'react-native';
// import from library
import {SharedElement} from 'react-navigation-shared-element';
import Image from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
// import from alias
import {FlatButton, ListView, TextView} from '@components';
import {withHotEnhanceRedux} from '@hocs';
// localImport
import {useProfileModel} from './Profile.hooks';
import {ProfileProps} from './types';
import {styles} from './Profile.style';
import {hotProfileRedux} from './Profile.slice';
import {UnsplashUser} from '@data';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Header} from 'react-native-elements';
import {useTheme} from '@hooks';

const _Profile: React.FC<ProfileProps> = (props) => {
  const {actions, selector, route, navigation} = props;
  const {colorScheme} = useTheme();
  const {isLoading, avatar, friends, isLoadingFriend, name} = useProfileModel(
    actions,
    selector,
    route.params.id,
  );

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

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
          <SharedElement id={`avatar-${item.username}`}>
            <Image
              style={[styles.friendImage, {borderColor: colorScheme.primary}]}
              source={{uri: item.profile_image.large}}
            />
          </SharedElement>
        </Pressable>
      );
    },
    [navigateToFriendProfile],
  );

  const keyExtractor = React.useCallback((item: UnsplashUser) => item.id, []);

  const renderHeader = () => {
    if (isLoading) {
      return (
        <>
          <SharedElement id={`avatar-${route.params.id}`}>
            <View style={styles.avatar} />
          </SharedElement>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              margin={20}
              height={20}
              borderRadius={10}
              width={200}
            />
          </SkeletonPlaceholder>
        </>
      );
    }
    return (
      <View style={[styles.listHeader]}>
        <SharedElement id={`avatar-${route.params.id}`}>
          <Image style={styles.avatar} source={{uri: avatar}} />
        </SharedElement>
        <TextView style={styles.name} text={name} />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colorScheme.background}]}
      edges={['bottom']}>
      <Header
        leftComponent={
          <FlatButton
            onPress={goBack}
            title="Back"
            titleStyle={{color: colorScheme.onPrimary}}
          />
        }
        backgroundColor={colorScheme.primary}
      />
      <ListView
        numColumns={3}
        contentContainerStyle={[styles.listView]}
        ListHeaderComponent={renderHeader()}
        refreshing={isLoadingFriend}
        showsVerticalScrollIndicator={false}
        LoadingComponent={
          <>
            <SkeletonPlaceholder backgroundColor={colorScheme.background}>
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
// Profile.sharedElements = (route: ProfileRouteProp) => [
//   {id: `avatar-${route.params.id}`},
// ];
