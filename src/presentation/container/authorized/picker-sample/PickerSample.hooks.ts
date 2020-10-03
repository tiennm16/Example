import React from 'react';
import {} from 'react-native';

import {useDispatch, useSelector, Selector} from 'react-redux';
import {pickerSampleSlice, INITIAL_STATE} from './PickerSample.slice';
import {
  PickerSampleReduxSelectionState,
  StoreStateWithPickerSample,
} from './types';

export const pickerSampleSelector: Selector<
  StoreStateWithPickerSample,
  PickerSampleReduxSelectionState
> = ({PickerSample = INITIAL_STATE}) => PickerSample;

const {
  actions: {},
} = pickerSampleSlice;

export function usePickerSampleModel() {
  const {} = useSelector<
    StoreStateWithPickerSample,
    PickerSampleReduxSelectionState
  >(pickerSampleSelector);
  const dispatch = useDispatch();

  return {};
}
