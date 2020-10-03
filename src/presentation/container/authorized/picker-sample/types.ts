import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ParamsType} from '@storyboards';
import {RootStoreState} from '@shared-state';

export type PickerSampleNavigationProps = StackNavigationProp<
  ParamsType,
  'PickerSample'
>;

export type  PickerSampleRouteProp = RouteProp<ParamsType, ' PickerSample'>;

export type  PickerSampleProps = {
  navigation:  PickerSampleNavigationProps;
  route:  PickerSampleRouteProp;
};



export type PickerSampleState = {

};

export type StoreStateWithPickerSample = RootStoreState & {
  PickerSample?: PickerSampleState;
};

export type PickerSampleReduxSelectionState = PickerSampleState & {};
