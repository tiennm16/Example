import * as React from 'react';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {Home, Profile} from '@containers';

const Stack = createSharedElementStackNavigator();

export const AuthorizedNavigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        sharedElements={(route) => {
          return [`avatar-${route.params.id}`];
        }}
      />
    </Stack.Navigator>
  );
};
