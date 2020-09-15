import {combineEpics, Epic} from 'redux-observable';
import {filter, mergeMap, map, catchError} from 'rxjs/operators';
import {of, concat} from 'rxjs';

import {ProfileActions} from './types';
import {container} from 'tsyringe';
import {ReqresRepository} from '@data';

export const hotProfileEpic = (actions: ProfileActions): Epic => {
  const {
    fetchProfile,
    fetchProfileSuccess,
    fetchProfileStart,
    fetchProfileFailed,

    fetchFriendFailed,
    fetchFriendStart,
    fetchFriendSuccess,
  } = actions;
  const fetchProfileEpic$: Epic = (action$) =>
    action$.pipe(
      filter(fetchProfile.match),
      mergeMap((action) => {
        const repo = container.resolve<ReqresRepository>('ReqresRepository');
        return concat(
          of(fetchProfileStart()),
          repo.getUser(action.payload).pipe(
            map((profile) => fetchProfileSuccess(profile)),
            catchError((err) => {
              console.warn(err);
              return of(fetchProfileFailed());
            }),
          ),
        );
      }),
    );

  const fetchFriendEpic$: Epic = (action$) =>
    action$.pipe(
      filter(fetchProfile.match),
      mergeMap(() => {
        const repo = container.resolve<ReqresRepository>('ReqresRepository');
        return concat(
          of(fetchFriendStart()),
          repo.listUsers().pipe(
            map((data) => fetchFriendSuccess(data)),
            catchError((err) => {
              console.warn(err);
              return of(fetchFriendFailed());
            }),
          ),
        );
      }),
    );
  return combineEpics(fetchProfileEpic$, fetchFriendEpic$);
};
