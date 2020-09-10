import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { AuthorizedStoryboardParamList } from '@storyboards';

export type HomeNavigationProps = StackNavigationProp<
    AuthorizedStoryboardParamList,
    'Home'
>;

export type HomeRouteProp = RouteProp<
    AuthorizedStoryboardParamList,
    'Home'
>;

export type HomeProps = {
    navigation: HomeNavigationProps;
    route: HomeRouteProp;
};



export type HomeReduxSelectionState = {
};