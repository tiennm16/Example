import {inject, injectable} from 'tsyringe';
import {Observable, merge} from 'rxjs';
import {UnsplashPhoto} from '../model';
import {
  RemoteUnsplashDataSource,
  LocalUnsplashDataSource,
} from '../data-source';
import {tap, delay} from 'rxjs/operators';

@injectable()
export class UnsplashRepository {
  static cache: UnsplashPhoto[] = [];
  constructor(
    @inject('RemoteUnsplashDataSource')
    private readonly dataSource: RemoteUnsplashDataSource,
    @inject('LocalUnsplashDataSource')
    private readonly localDataSource: LocalUnsplashDataSource,
  ) {}

  getPhotos(page: number = 1): Observable<UnsplashPhoto[]> {
    if (page >= 5) {
      return this.dataSource.getPhotos(page);
    }
    return merge(
      this.localDataSource.getPhotos(page),
      this.dataSource.getPhotos(page).pipe(
        tap((x) => {
          page < 5 && this.localDataSource.savePhotos(x, page);
        }),
      ),
    ).pipe(delay(1000));
  }
}
