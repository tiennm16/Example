import {inject, injectable} from 'tsyringe';
import {Observable} from 'rxjs';
import {} from 'rxjs/operators';

import {UseCase} from '@core';
import {AuthenticationRepository} from '../../repository';

@injectable()
export class SignOutUseCase implements UseCase<boolean, any> {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}
  call(): Observable<boolean> {
    return this.authenticationRepository.signOut();
  }
}
