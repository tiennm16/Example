import {Epic, combineEpics} from 'redux-observable';
import {
  filter,
  switchMap,
  map,
  catchError,
  skipWhile,
  mergeMap,
  throttle,
} from 'rxjs/operators';
import {of, concat, timer} from 'rxjs';

import {homeSlice} from './home.slice';
import {container} from 'tsyringe';
import {UnsplashPhoto, UnsplashRepository} from '@data';
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

const refreshEpic$: Epic<Action, Action, {home: HomeState}> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(refresh.match),
    switchMap(() => {
      const repo = container.resolve<UnsplashRepository>('UnsplashRepository');
      return repo.getPhotos().pipe(
        filter(
          (data) =>
            data.length <= 0 ||
            !compareData(data, state$.value.home?.data[0]?.data),
        ),
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
    throttle(() => timer(300)),
    skipWhile(() => state$.value.home?.loadingMore),
    filter(loadMore.match),
    mergeMap(() => {
      const page = state$.value.home.data.length + 1;
      const repo = container.resolve<UnsplashRepository>('UnsplashRepository');
      return concat(
        of(loadMoreStart()),
        repo.getPhotos(page).pipe(
          filter(
            (data) =>
              !compareData(data, state$.value.home?.data[page - 1]?.data),
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

function compareData(next: UnsplashPhoto[], old?: UnsplashPhoto[]): boolean {
  if (!old) {
    return false;
  }
  const nextIds = next.map((x) => x.id).join(',');
  const oldIds = old.map((x) => x.id).join(',');
  const equal = nextIds === oldIds;
  return equal;
}

export const homeEpic = combineEpics(refreshEpic$, loadMoreEpic$);
