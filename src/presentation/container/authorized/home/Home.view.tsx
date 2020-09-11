import React from 'react';
import {SectionListRenderItemInfo} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {SectionListView} from '@components';
import {withHotRedux} from '@hocs';

import {useHomeModel} from './Home.hooks';
import {UnSplashItem, UnsplashLoadingItem} from './Home.item';
import {homeSlice} from './home.slice';
import {homeEpic} from './home.epic';
import {HomeProps} from './types';
import {styles} from './Home.style';
import {UnsplashPhoto} from '@data';

const _Home: React.FC<HomeProps> = (props) => {
  const {} = props;
  const {doRefresh, data, refreshing, doLoadMore, loadingMore} = useHomeModel();
  const renderItem = React.useCallback(
    ({item}: SectionListRenderItemInfo<UnsplashPhoto>) => {
      return <UnSplashItem item={item} />;
    },
    [],
  );

  const keyExtractor = React.useCallback((item: UnsplashPhoto) => item.id, []);
  return (
    <SafeAreaView style={[styles.container]}>
      <SectionListView<UnsplashPhoto>
        contentContainerStyle={styles.listView}
        sections={data}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={doRefresh}
        isLoadingMore={loadingMore}
        onLoadMore={doLoadMore}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.1}
        LoadingComponent={
          <>
            <UnsplashLoadingItem />
            <UnsplashLoadingItem />
            <UnsplashLoadingItem />
            <UnsplashLoadingItem />
            <UnsplashLoadingItem />
          </>
        }
      />
    </SafeAreaView>
  );
};

export const Home = withHotRedux(
  homeSlice.name,
  homeSlice.reducer,
  homeEpic,
)(_Home);
