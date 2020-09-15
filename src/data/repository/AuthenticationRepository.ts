import {inject, injectable} from 'tsyringe';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AuthenticationRepository, SignInResult} from '@domain';

import {
  LocalAuthenticationDataSource,
  RemoteAuthenticationDataSource,
} from '../data-source';

@injectable()
export class CombineAuthenticationRepository
  implements AuthenticationRepository {
  constructor(
    @inject('LocalAuthenticationDataSource')
    private readonly localDataSource: LocalAuthenticationDataSource,
    @inject('RemoteAuthenticationDataSource')
    private readonly remoteDataSource: RemoteAuthenticationDataSource,
  ) {}

  signIn(credential?: any): Observable<SignInResult> {
    return this.remoteDataSource.signIn(credential).pipe(
      map(
        (result: any): SignInResult => {
          return {fromLocal: false, token: result.token}; // change data for free API
        },
      ),
    );
  }
  getToken(): Observable<string> {
    return this.localDataSource.getToken();
  }
  saveToken(key: string, token: string): Observable<boolean> {
    return this.localDataSource.saveToken(key, token);
  }
}
