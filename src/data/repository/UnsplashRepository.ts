import {inject, injectable} from 'tsyringe';
import {Observable, merge} from 'rxjs';
import {UnsplashPhoto} from '../model';
import {
  RemoteUnsplashDataSource,
  LocalUnsplashDataSource,
} from '../data-source';
import {tap} from 'rxjs/operators';

@injectable()
export class UnsplashRepository {
  maximumCachedRequest: number = 10;
  constructor(
    @inject('RemoteUnsplashDataSource')
    private readonly dataSource: RemoteUnsplashDataSource,
    @inject('LocalUnsplashDataSource')
    private readonly localDataSource: LocalUnsplashDataSource,
  ) {}

  getPhotos(page: number = 1): Observable<UnsplashPhoto[]> {
    if (page >= this.maximumCachedRequest) {
      return this.dataSource.getPhotos(page);
    }
    return merge(
      this.localDataSource.getPhotos(page),
      this.dataSource.getPhotos(page).pipe(
        tap((x) => {
          page < this.maximumCachedRequest &&
            this.localDataSource.savePhotos(x, page);
        }),
      ),
    );
  }
}
