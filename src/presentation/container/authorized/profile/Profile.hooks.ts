import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  ProfileActions,
  ProfileSelector,
  ProfileReduxSelectionState,
  StoreStateWithProfile,
} from './types';

export function useProfileModel(
  actions: ProfileActions,
  profileSelector: ProfileSelector,
  profileId: string,
) {
  const {isLoading, profile, friends, isLoadingFriend} = useSelector<
    StoreStateWithProfile,
    ProfileReduxSelectionState
  >(profileSelector);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.fetchProfile(profileId));
  }, [dispatch, actions, profileId]);
  return {
    isLoading,
    avatar: profile?.profile_image.large,
    friends,
    isLoadingFriend,
    name: profile?.name,
  };
}
