import React from 'react';
import {ListRenderItemInfo} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {ListView} from '@components';
import {withHotRedux} from '@hocs';

import {useHomeModel} from './Home.hooks';
import {UnSplashItem} from './Home.item';
import {homeSlice} from './home.slice';
import {homeEpic} from './home.epic';
import {HomeProps} from './types';
import {styles} from './Home.style';

const _Home: React.FC<HomeProps> = (props) => {
  const {} = props;
  const {doRefresh, data, refreshing} = useHomeModel();

  const renderItem = React.useCallback(({item}: ListRenderItemInfo<string>) => {
    return <UnSplashItem item={item} />;
  }, []);

  const keyExtractor = React.useCallback((item): string => item, []);
  return (
    <SafeAreaView style={[styles.container]}>
      <ListView
        contentContainerStyle={styles.listView}
        data={data}
        refreshing={refreshing}
        onRefresh={doRefresh}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export const Home = withHotRedux(
  homeSlice.name,
  homeSlice.reducer,
  homeEpic,
)(_Home);
