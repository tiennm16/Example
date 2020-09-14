import React from 'react';
import {
  View,
  StyleSheet,
  SectionListProps,
  RefreshControl,
  SectionList,
} from 'react-native';
import {EmptyListView, EmptyListViewProps} from './EmptyListView';
import {SkeletonLoadingItem} from './SkeletonLoadingItem';

export interface SectionListViewProps<ItemT> extends SectionListProps<ItemT> {
  refreshing?: boolean;
  onRefresh?: () => void;
  emptyListViewProps?: EmptyListViewProps;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  LoadingComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export const SectionListView = <T extends any>(
  props: SectionListViewProps<T>,
) => {
  const {
    refreshing,
    ListFooterComponent,
    sections,
    isLoadingMore,
    onLoadMore,
    LoadingComponent,
  } = props;

  const refreshIndicatorVisible =
    refreshing === true && (sections?.length ?? 0) > 0;

  const skeletonDisplayable =
    (refreshing && sections?.length === 0) || isLoadingMore;
  const onEndReached = React.useCallback(() => {
    if (!onLoadMore || isLoadingMore) {
      return;
    }
    onLoadMore();
  }, [isLoadingMore, onLoadMore]);

  const emptyItem = () => {
    if (refreshing) {
      return null;
    }
    return <EmptyListView {...props.emptyListViewProps} />;
  };

  const footer = () => {
    if (skeletonDisplayable) {
      if (LoadingComponent) {
        return LoadingComponent;
      }
      return (
        <>
          <SkeletonLoadingItem />
          <SkeletonLoadingItem />
          <SkeletonLoadingItem />
        </>
      );
    }
    return ListFooterComponent;
  };

  return (
    <View style={[styles.container]}>
      <SectionList
        {...props}
        ListEmptyComponent={emptyItem()}
        ListFooterComponent={footer()}
        refreshControl={
          <RefreshControl
            refreshing={refreshIndicatorVisible}
            onRefresh={props.onRefresh}
          />
        }
        style={styles.list}
        onEndReached={onEndReached}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
