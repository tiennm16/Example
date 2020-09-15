import {
  createAction,
  createSlice,
  Slice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {ProfileActions, ProfileSelector, ProfileState} from './types';

import {HotReduxComposer} from '@hocs';
import {hotProfileEpic} from './Profile.epic';
import {UnsplashUser} from '@data';

export const INITIAL_STATE: ProfileState = {
  isLoading: false,
  friends: [],
  isLoadingFriend: false,
};

export type ProfileSlice = Slice;
export const hotProfileRedux: HotReduxComposer<
  ProfileActions,
  ProfileSelector
> = (name) => {
  const fetchProfile = createAction<string>(`profile/${name}/fetchProfile`);
  const slice = createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {
      fetchProfileStart: (state) => {
        return {
          ...state,
          isLoading: true,
        };
      },
      fetchProfileSuccess: (
        state,
        {payload: profile}: PayloadAction<UnsplashUser>,
      ) => {
        return {
          ...state,
          isLoading: false,
          profile,
        };
      },
      fetchProfileFailed: (state) => {
        return {
          ...state,
          isLoading: false,
        };
      },
      fetchFriendStart: (state) => ({...state, isLoadingFriend: true}),
      fetchFriendSuccess: (
        state,
        {payload}: PayloadAction<UnsplashUser[]>,
      ) => ({
        ...state,
        isLoadingFriend: false,
        friends: payload,
      }),
      fetchFriendFailed: (state) => ({...state, isLoadingFriend: false}),
    },
  });

  const selector: ProfileSelector = (state) => {
    return state[name] ?? INITIAL_STATE;
  };
  const actions: ProfileActions = {
    fetchProfile,
    ...slice.actions,
  };
  return {
    reducer: slice.reducer,
    actions,
    selector,
    epic: hotProfileEpic(actions),
  };
};
