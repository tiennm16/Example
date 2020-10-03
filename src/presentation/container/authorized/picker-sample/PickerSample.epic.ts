import {combineEpics} from 'redux-observable';
import {} from 'rxjs/operators';
import {} from 'rxjs';

import {pickerSampleSlice} from './PickerSample.slice';
import {PickerSampleState} from './types';

export const pickerSampleEpic = combineEpics();
