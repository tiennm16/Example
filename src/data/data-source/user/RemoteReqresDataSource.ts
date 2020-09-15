import {inject, injectable} from 'tsyringe';
import {RxUnsplashProvider} from '@core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UnsplashPhoto, UnsplashUser} from '../../model';

export interface RemoteReqresDataSource {
  list(page?: number): Observable<UnsplashUser[]>;
  get(username: string): Observable<UnsplashUser>;
}

@injectable()
export class ApiReqresDataSource implements RemoteReqresDataSource {
  constructor(
    @inject('UnsplashApiProvider')
    private readonly provider: RxUnsplashProvider,
  ) {}
  list(page: number = 1): Observable<UnsplashUser[]> {
    return this.provider.get<UnsplashPhoto[]>(`/photos?page=${page}`).pipe(
      map((x) =>
        x.data.map(
          (p): UnsplashUser => ({
            ...p.user,
            profile_image: {...p.user.profile_image, large: p.urls.regular},
          }),
        ),
      ),
    );
  }
  get(username: string): Observable<UnsplashUser> {
    return this.provider
      .get<UnsplashUser>(`/users/${username}`)
      .pipe(map((x) => x.data));
  }
}
