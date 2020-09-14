import {signOut} from '@shared-state';
import React from 'react';
import {} from 'react-native';

import {useDispatch, useSelector, Selector} from 'react-redux';
import {homeSlice, INITIAL_STATE} from './home.slice';
import {HomeReduxSelectionState, StoreStateWithHome} from './types';

export const homeSelector: Selector<
  StoreStateWithHome,
  HomeReduxSelectionState
> = ({home = INITIAL_STATE}) => home;

const {
  actions: {refresh, loadMore},
} = homeSlice;

export function useHomeModel() {
  const {data, refreshing, loadingMore} = useSelector<
    StoreStateWithHome,
    HomeReduxSelectionState
  >(homeSelector);
  const dispatch = useDispatch();

  const doSignOut = React.useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const doRefresh = React.useCallback(() => {
    dispatch(refresh());
  }, [dispatch]);

  const doLoadMore = React.useCallback(() => {
    dispatch(loadMore());
  }, [dispatch]);

  React.useEffect(() => {
    doRefresh();
  }, [doRefresh]);

  return {data, refreshing, loadingMore, doLoadMore, doRefresh, doSignOut};
}
