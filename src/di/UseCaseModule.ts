import {container} from 'tsyringe';

import {SignInUseCase, SignOutUseCase} from '@domain';

export function registerUseCaseDependencies() {
  container.register('SignInUseCase', {
    useClass: SignInUseCase,
  });
  container.register('SignOutUseCase', {
    useClass: SignOutUseCase,
  });
}
