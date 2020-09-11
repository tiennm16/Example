import {injectable} from 'tsyringe';
import {Observable, Observer} from 'rxjs';
import AsyncStorage from '@react-native-community/async-storage';

import {UnsplashPhoto} from '../../model';

export interface LocalUnsplashDataSource {
  /**
   * @method getPhotos
   *
   * @description Sign in user with phone
   */
  getPhotos(): Observable<UnsplashPhoto[]>;

  savePhotos(photo: UnsplashPhoto[]): void;
}

@injectable()
export class AsyncStorageUnsplashDataSource implements LocalUnsplashDataSource {
  savePhotos(photo: UnsplashPhoto[]): void {
    AsyncStorage.setItem('store', JSON.stringify(photo));
  }

  getPhotos(): Observable<UnsplashPhoto[]> {
    return Observable.create(async (observer: Observer<UnsplashPhoto[]>) => {
      const data = await AsyncStorage.getItem('store');
      const photos = data ? JSON.parse(data) : [];
      observer.next(photos);
      observer.complete();
    });
  }
}
