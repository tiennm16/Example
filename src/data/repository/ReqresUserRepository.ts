import {inject, injectable} from 'tsyringe';
import {Observable} from 'rxjs';
import {RemoteReqresDataSource} from '../data-source';
import {UnsplashUser} from '../model';

@injectable()
export class ReqresRepository {
  constructor(
    @inject('RemoteReqresDataSource')
    private readonly dataSource: RemoteReqresDataSource,
  ) {}

  getUser(username: string): Observable<UnsplashUser> {
    return this.dataSource.get(username);
  }

  listUsers(page: number = 1): Observable<UnsplashUser[]> {
    return this.dataSource.list(page);
  }
}
