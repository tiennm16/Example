import React from 'react';
import {Platform, SectionListRenderItemInfo} from 'react-native';

import {Header} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

import {FlatButton, SectionListView} from '@components';
import {withHotRedux} from '@hocs';
import {UnsplashPhoto} from '@data';
import {useThemeWithSetter} from '@hooks';
import {ThemeConfig} from '@core';

import {useHomeModel} from './Home.hooks';
import {UnSplashItem, UnsplashLoadingItem} from './Home.item';
import {homeSlice} from './home.slice';
import {homeEpic} from './home.epic';
import {HomeProps} from './types';
import {styles} from './Home.style';

const _Home: React.FC<HomeProps> = (props) => {
  const {navigation} = props;
  const [theme, setTheme] = useThemeWithSetter();
  const {colorScheme} = theme;
  const {
    data,
    refreshing,
    loadingMore,
    doLoadMore,
    doRefresh,
    doSignOut,
  } = useHomeModel();

  const toggleThemeButtonTitle = React.useMemo(() => {
    if (theme.isDark) {
      return 'Light Theme';
    }
    return 'Dark Theme';
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    if (theme.isDark) {
      return setTheme(ThemeConfig.Light);
    }
    return setTheme(ThemeConfig.Dark);
  }, [theme, setTheme]);

  const navigateToProfile = React.useCallback(
    (item: UnsplashPhoto) => {
      navigation.navigate('Profile', {id: item.user.username});
    },
    [navigation],
  );

  const renderItem = React.useCallback(
    ({item}: SectionListRenderItemInfo<UnsplashPhoto>) => {
      return <UnSplashItem item={item} onPress={navigateToProfile} />;
    },
    [navigateToProfile],
  );

  const keyExtractor = React.useCallback((item: UnsplashPhoto) => item.id, []);
  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, {backgroundColor: colorScheme.background}]}>
      <Header
        backgroundColor={colorScheme.primary}
        leftComponent={
          <FlatButton
            onPress={doSignOut}
            title="Sign out"
            titleStyle={{color: colorScheme.onPrimary}}
          />
        }
        rightComponent={
          <FlatButton
            onPress={toggleTheme}
            title={toggleThemeButtonTitle}
            titleStyle={{color: colorScheme.onPrimary}}
          />
        }
      />
      <SectionListView<UnsplashPhoto>
        contentContainerStyle={styles.listView}
        sections={data}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={doRefresh}
        isLoadingMore={loadingMore}
        onLoadMore={doLoadMore}
        keyExtractor={keyExtractor}
        LoadingComponent={
          <>
            <UnsplashLoadingItem />
            <UnsplashLoadingItem />
            <UnsplashLoadingItem />
            <UnsplashLoadingItem />
            <UnsplashLoadingItem />
          </>
        }
        removeClippedSubviews={Platform.OS === 'android'}
      />
    </SafeAreaView>
  );
};

export const Home = withHotRedux(
  homeSlice.name,
  homeSlice.reducer,
  homeEpic,
)(_Home);
