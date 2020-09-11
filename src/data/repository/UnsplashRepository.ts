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

  getPhotos(): Observable<UnsplashPhoto[]> {
    return merge(
      this.localDataSource.getPhotos().pipe(delay(1000)),
      this.dataSource.getPhotos().pipe(delay(2000)),
    ).pipe(tap((x) => this.localDataSource.savePhotos(x)));
  }
}
