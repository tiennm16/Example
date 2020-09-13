import {Credential} from '@domain';
import {createAction} from '@reduxjs/toolkit';

export const signIn = createAction<Credential>('authentication/singIn');
export const signInBegin = createAction('authentication/signInBegin');
export const signInSuccess = createAction('authentication/signInSuccess');
export const signInFailed = createAction('authentication/signInFailed');

export const signInLocally = createAction('authentication/signInLocally');
export const signInLocallySuccess = createAction(
  'authentication/signInLocallySuccess',
);
export const signInLocallyFailed = createAction(
  'authentication/signInLocallyFailed',
);

export const signOut = createAction('authentication/signOut');
export const signOutFailed = createAction('authentication/signOutFailed');
export const signOutSuccess = createAction('authentication/signOutSuccess');
