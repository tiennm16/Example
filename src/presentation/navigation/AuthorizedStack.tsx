import * as React from 'react';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {Home, PickerSample, Profile} from '@containers';

const Stack = createSharedElementStackNavigator();

export const AuthorizedNavigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="PickerSample">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        sharedElements={(route) => {
          return [`avatar-${route.params.id}`];
        }}
      />
      <Stack.Screen name="PickerSample" component={PickerSample} />
    </Stack.Navigator>
  );
};
