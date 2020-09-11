import {Epic, combineEpics} from 'redux-observable';
import {
  filter,
  switchMap,
  map,
  catchError,
  skipWhile,
  mergeMap,
  takeWhile,
} from 'rxjs/operators';

import {homeSlice} from './home.slice';
import {container} from 'tsyringe';
import {UnsplashRepository} from '@data';
import {of, concat} from 'rxjs';
import {Action} from 'redux';
import {HomeState} from './types';

const {
  actions: {
    refresh,
    refreshSuccess,
    refreshFailed,
    loadMore,
    loadMoreStart,
    loadMoreFailed,
    loadMoreSuccess,
  },
} = homeSlice;

const refreshEpic$: Epic = (action$) =>
  action$.pipe(
    filter(refresh.match),
    switchMap(() => {
      const repo = container.resolve<UnsplashRepository>('UnsplashRepository');
      return repo.getPhotos().pipe(
        skipWhile((data) => data.length <= 0),
        map(refreshSuccess),
        catchError(() => of(refreshFailed())),
      );
    }),
  );

const loadMoreEpic$: Epic<Action, Action, {home: HomeState}> = (
  action$,
  state$,
) =>
  action$.pipe(
    skipWhile(() => state$.value.home?.loadingMore),
    filter(loadMore.match),
    mergeMap(() => {
      const page = state$.value.home.data.length + 1;
      const repo = container.resolve<UnsplashRepository>('UnsplashRepository');
      return concat(
        of(loadMoreStart()),
        repo.getPhotos(page).pipe(
          takeWhile(
            (data) =>
              JSON.stringify(data) !==
              JSON.stringify(state$.value.home.data[page - 1]?.data),
          ),
          map((data) => loadMoreSuccess({data, page})),
          catchError((x) => {
            console.warn(x);
            return of(loadMoreFailed());
          }),
        ),
      );
    }),
  );

export const homeEpic = combineEpics(refreshEpic$, loadMoreEpic$);
