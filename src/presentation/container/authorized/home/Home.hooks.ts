import React from 'react';
import {} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {homeSlice} from './home.slice';

import {homeSelector} from './Home.redux-selector';

const {
  actions: {refresh},
} = homeSlice;

export function useHomeModel() {
  const {data, refreshing} = useSelector(homeSelector);
  const dispatch = useDispatch();

  const doRefresh = React.useCallback(() => {
    dispatch(refresh());
  }, [dispatch]);
  React.useEffect(() => {
    refresh();
  }, [doRefresh]);
  React.useEffect(() => {}, [doRefresh]);
  return {doRefresh, data, refreshing};
}
