import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {RootStoreState} from '@shared-state';
import {UnsplashPhoto} from '@data';

export type HomeNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'Home'
>;

export type HomeRouteProp = RouteProp<AuthorizedStoryboardParamList, 'Home'>;

export type HomeProps = {
  navigation: HomeNavigationProps;
  route: HomeRouteProp;
};

export type Section = {
  page: number;
  data: UnsplashPhoto[];
};

export type HomeState = {
  data: Section[];
  refreshing: boolean;
  loadingMore: boolean;
};

export type StoreStateWithHome = RootStoreState & {
  home?: HomeState;
};

export type HomeReduxSelectionState = HomeState;
