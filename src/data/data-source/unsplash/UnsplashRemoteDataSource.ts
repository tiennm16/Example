import {injectable, inject} from 'tsyringe';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {RxUnsplashProvider} from '@core';
import {UnsplashPhoto} from '../../model';

export interface RemoteUnsplashDataSource {
  /**
   * @method signIn
   *
   * @description Sign in user with phone
   */
  getPhotos(): Observable<UnsplashPhoto[]>;
}

@injectable()
export class ApiUnsplashDataSource implements RemoteUnsplashDataSource {
  constructor(
    @inject('UnsplashApiProvider')
    private readonly provider: RxUnsplashProvider,
  ) {}
  getPhotos(): Observable<UnsplashPhoto[]> {
    return this.provider
      .get<UnsplashPhoto[]>('/photos')
      .pipe(map((x) => x.data));
  }
}
