import {injectable} from 'tsyringe';
import {Observable, Observer} from 'rxjs';
import {add} from 'date-fns';

import AsyncStorage from '@react-native-community/async-storage';

import {UnsplashPhoto} from '../../model';

export interface LocalUnsplashDataSource {
  /**
   * @method getPhotos
   *
   * @description Sign in user with phone
   */
  getPhotos(page: number): Observable<UnsplashPhoto[]>;

  savePhotos(photo: UnsplashPhoto[], page: number): void;
}

@injectable()
export class AsyncStorageUnsplashDataSource implements LocalUnsplashDataSource {
  static KEY = 'LocalUnsplashDataSource';
  savePhotos(photos: UnsplashPhoto[], page: number = 1): void {
    AsyncStorage.setItem(
      `${AsyncStorageUnsplashDataSource.KEY}/${page}`,
      JSON.stringify({
        expired: add(new Date(), {hours: 2}).toISOString(),
        photos,
      }),
    );
  }

  getPhotos(page: number = 1): Observable<UnsplashPhoto[]> {
    return Observable.create(async (observer: Observer<UnsplashPhoto[]>) => {
      const data = await AsyncStorage.getItem(
        `${AsyncStorageUnsplashDataSource.KEY}/${page}`,
      );
      const cache = data ? JSON.parse(data) : {};
      if (new Date(cache.expired) < new Date()) {
        observer.next(cache.photos);
      } else {
        observer.next([]);
      }
      observer.complete();
    });
  }
}
