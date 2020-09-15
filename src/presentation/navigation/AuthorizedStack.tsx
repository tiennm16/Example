import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {AuthorizedStoryboardParamList} from '../storyboard/Authorized.storyboard';
import {Home, Profile} from '@containers';

const Stack = createStackNavigator<AuthorizedStoryboardParamList>();

export const AuthorizedNavigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
