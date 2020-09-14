import React from 'react';

import { container } from 'tsyringe';
import { filter } from 'rxjs/operators';
import { useSelector, useDispatch } from 'react-redux';

import { signIn, StoreContainer, signInFailed, signInSuccess } from '@shared-state';

import { signInSelector } from './SignIn.redux-selector';
import { SignInHandle } from './types';
import { Alert } from 'react-native';

export function useSignIn(handle: SignInHandle) {
  const { onSignInFailed } = handle;
  const { isAuthenticating } = useSelector(signInSelector);
  const dispatch = useDispatch();
  const submit = () => dispatch(signIn({
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  }));
  const { action$ } = container.resolve<StoreContainer>('StoreContainer');

  React.useEffect(() => {
    const subscription = action$
      .pipe(filter(signInSuccess.match))
      .subscribe(signInSuccess);
    return () => {
      if (subscription.closed) {
        return;
      }
      subscription.unsubscribe();
    };
  }, [action$, onSignInFailed]);
  return { isAuthenticating, submit };
}

export function socialAction() {
  const loginSocial = () => {
    Alert.alert('This feature is on development!');
  };
  return { loginSocial };
}
