import {container} from 'tsyringe';
import {
  CombineAuthenticationRepository,
  ReqresRepository,
  UnsplashRepository,
} from '@data';

export function registerRepositoryDependencies() {
  container.register('AuthenticationRepository', {
    useClass: CombineAuthenticationRepository,
  });

  container.register('UnsplashRepository', {
    useClass: UnsplashRepository,
  });

  container.register('ReqresRepository', {
    useClass: ReqresRepository,
  });
}
