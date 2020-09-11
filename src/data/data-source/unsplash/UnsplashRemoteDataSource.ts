import {injectable, inject} from 'tsyringe';
import {Observable} from 'rxjs';
import {map, delay} from 'rxjs/operators';

import {RxUnsplashProvider} from '@core';
import {UnsplashPhoto} from '../../model';

export interface RemoteUnsplashDataSource {
  /**
   * @method signIn
   *
   * @description Sign in user with phone
   */
  getPhotos(page: number): Observable<UnsplashPhoto[]>;
}

@injectable()
export class ApiUnsplashDataSource implements RemoteUnsplashDataSource {
  constructor(
    @inject('UnsplashApiProvider')
    private readonly provider: RxUnsplashProvider,
  ) {}
  getPhotos(page: number = 1): Observable<UnsplashPhoto[]> {
    return this.provider.get<UnsplashPhoto[]>(`/photos?page=${page}`).pipe(
      delay(1000),
      map((x) => x.data),
    );
  }
}
