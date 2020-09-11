import {Selector} from 'react-redux';
import {RootStoreState} from '@shared-state';
import {HomeReduxSelectionState} from './types';
import {HomeState, INITIAL_STATE} from './home.slice';

export type StoreStateWithHome = RootStoreState & {
  home?: HomeState;
};

export const homeSelector: Selector<
  StoreStateWithHome,
  HomeReduxSelectionState
> = ({home = INITIAL_STATE}) => home;
