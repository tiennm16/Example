import {Epic, combineEpics} from 'redux-observable';
import {container} from 'tsyringe';
import {AnyAction} from 'redux';
import {of, concat} from 'rxjs';
import {filter, catchError, switchMap, map} from 'rxjs/operators';

import {
  signInSuccess,
  signInFailed,
  signIn,
  signInBegin,
  signInLocally,
  signInLocallyFailed,
  signInLocallySuccess,
  signOut,
  signOutSuccess,
  signOutFailed,
} from '../actions';

import {SignInUseCase, SignOutUseCase} from '@domain';
import {RootStoreState} from '../types';

const signInEpic$: Epic = (action$) =>
  action$.pipe(
    filter(signIn.match),
    switchMap((action) => {
      const useCase = container.resolve<SignInUseCase>('SignInUseCase');
      return concat(
        of(signInBegin()),
        useCase.call(action.payload).pipe(
          map(signInSuccess),
          catchError(() => of(signInFailed())),
        ),
      );
    }),
  );
const signInLocallyEpic$: Epic = (action$) =>
  action$.pipe(
    filter(signInLocally.match),
    switchMap(() => {
      const useCase = container.resolve<SignInUseCase>('SignInUseCase');
      return useCase.call().pipe(
        map(signInLocallySuccess),
        catchError(() => of(signInLocallyFailed())),
      );
    }),
  );

const signOutEpic$: Epic<AnyAction, AnyAction, RootStoreState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(signOut.match),
    filter(() => state$.value.authentication.isAuthorized),
    switchMap(() => {
      const useCase = container.resolve<SignOutUseCase>('SignOutUseCase');
      return useCase.call().pipe(
        map(signOutSuccess),
        catchError(() => of(signOutFailed())),
      );
    }),
  );
export const authenticationEpic = combineEpics(
  signInEpic$,
  signInLocallyEpic$,
  signOutEpic$,
);
