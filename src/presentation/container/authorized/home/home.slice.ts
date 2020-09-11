import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
export type HomeState = {
  data: string[];
  refreshing: boolean;
};

export const INITIAL_STATE: HomeState = {
  data: [],
  refreshing: false,
};
export const homeSlice = createSlice({
  name: 'home',
  initialState: INITIAL_STATE,
  reducers: {
    refresh: (state) => Object.assign(state, {refreshing: true}),
    refreshSuccess: (state, {payload}: PayloadAction<string[]>) =>
      Object.assign(state, {refreshing: false, data: payload}),
    refreshFailed: (state) => Object.assign(state, {refreshing: false}),
  },
});
