import {UnsplashPhoto} from '@data';
import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import {HomeState, Section} from './types';

export const INITIAL_STATE: HomeState = {
  data: [],
  refreshing: true,
  loadingMore: false,
};
export const homeSlice = createSlice({
  name: 'home',
  initialState: INITIAL_STATE,
  reducers: {
    refresh: (state) => Object.assign(state, {refreshing: true}),
    refreshSuccess: (state, {payload}: PayloadAction<UnsplashPhoto[]>) =>
      Object.assign(state, {
        refreshing: false,
        data: [{page: 1, data: payload}],
      }),
    refreshFailed: (state) => Object.assign(state, {refreshing: false}),
    loadMore: (state) => state,
    loadMoreStart: (state) => Object.assign(state, {loadingMore: true}),
    loadMoreSuccess: (
      state,
      {
        payload: {data, page},
      }: PayloadAction<{data: UnsplashPhoto[]; page: number}>,
    ) => {
      if (page <= state.data.length) {
        const sections: Section[] = [...state.data];
        sections[page - 1] = {page, data};
        return Object.assign(state, {
          loadingMore: false,
          data: sections,
        });
      }
      return Object.assign(state, {
        data: state.data.concat([{data, page}]),
        loadingMore: false,
      });
    },
    loadMoreFailed: (state) => Object.assign(state, {loadingMore: false}),
  },
});
