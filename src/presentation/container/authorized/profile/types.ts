import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {RootStoreState} from '@shared-state';
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import {Selector} from 'react-redux';
import {ReduxComposeComponentProps} from '@hocs';
import {UnsplashUser} from '@data';

export type ProfileNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'Profile'
>;

export type ProfileRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'Profile'
>;

export type ProfileActions = {
  fetchProfile: ActionCreatorWithPayload<string>;
  fetchProfileSuccess: ActionCreatorWithPayload<UnsplashUser>;
  fetchProfileFailed: ActionCreatorWithoutPayload;
  fetchProfileStart: ActionCreatorWithoutPayload;

  fetchFriendStart: ActionCreatorWithoutPayload;
  fetchFriendSuccess: ActionCreatorWithPayload<UnsplashUser[]>;
  fetchFriendFailed: ActionCreatorWithoutPayload;
};

export type ProfileSelector = Selector<
  StoreStateWithProfile,
  ProfileReduxSelectionState
>;

export interface ProfileProps
  extends ReduxComposeComponentProps<ProfileActions, ProfileSelector> {
  navigation: ProfileNavigationProps;
  route: ProfileRouteProp;
}

export type ProfileState = {
  isLoading: boolean;
  profile?: UnsplashUser;
  friends: UnsplashUser[];
  isLoadingFriend: boolean;
};

export type StoreStateWithProfile = RootStoreState &
  {
    [key in string]?: ProfileState;
  };

export type ProfileReduxSelectionState = ProfileState & {};
