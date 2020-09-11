import {Epic, combineEpics} from 'redux-observable';
import {filter, switchMap, map, catchError} from 'rxjs/operators';

// import {refresh, refreshSuccess} from './home.action';
import {homeSlice} from './home.slice';
import {container} from 'tsyringe';
import {UnsplashRepository} from '@data';
import {of} from 'rxjs';

const {
  actions: {refresh, refreshSuccess, refreshFailed},
} = homeSlice;

const setThemeEpic$: Epic = (action$) =>
  action$.pipe(
    filter(refresh.match),
    switchMap(() => {
      const repo = container.resolve<UnsplashRepository>('UnsplashRepository');
      return repo.getPhotos().pipe(
        map((data) => data.map((x) => x.urls.regular)),
        map(refreshSuccess),
        catchError(() => of(refreshFailed())),
      );
    }),
    catchError(() => of(refreshFailed())),
  );

export const homeEpic = combineEpics(setThemeEpic$);
