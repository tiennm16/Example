import {ListView} from '@components';
import {UnsplashPhoto} from '@data';
import React from 'react';
import {StyleSheet, ListRenderItemInfo} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UnSplashItem} from '../home/Home.item';
import {useFAQHook} from './faq.store';

export interface FAQProps {}

export const FAQ: React.FC<FAQProps> = () => {
  const [{data, refreshing}, {refresh}] = useFAQHook();

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<UnsplashPhoto>) => {
      return <UnSplashItem item={item} />;
    },
    [],
  );

  const keyExtractor = React.useCallback((item: UnsplashPhoto) => item.id, []);

  return (
    <SafeAreaView style={StyleSheet.flatten([styles.container])}>
      <ListView
        refreshing={refreshing}
        onRefresh={refresh}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
