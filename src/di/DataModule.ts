import {container} from 'tsyringe';
import {
  KeyChainAuthenticationDataSource,
  ApiAuthenticationDataSource,
  ApiUnsplashDataSource,
  AsyncStorageUnsplashDataSource,
  ApiReqresDataSource,
} from '@data';
import {SignInUseCase} from '@domain';
import {
  BearerAuthorizationRxAxiosProvider,
  BuildConfig,
  RxUnsplashProvider,
} from '@core';

export function registerDataDependencies() {
  container.register('ApiProvider', {
    useValue: new BearerAuthorizationRxAxiosProvider({
      baseURL: BuildConfig.ApiUrl,
    }),
  });
  container.register('UnsplashApiProvider', {
    useValue: new RxUnsplashProvider(BuildConfig.UNSPLASH_KEY),
  });
  container.register('LocalAuthenticationDataSource', {
    useClass: KeyChainAuthenticationDataSource,
  });

  container.register('RemoteAuthenticationDataSource', {
    useClass: ApiAuthenticationDataSource,
  });

  container.register('RemoteUnsplashDataSource', {
    useClass: ApiUnsplashDataSource,
  });

  container.register('LocalUnsplashDataSource', {
    useClass: AsyncStorageUnsplashDataSource,
  });

  container.register('RemoteReqresDataSource', {
    useClass: ApiReqresDataSource,
  });

  container.register('SignInUseCase', {
    useClass: SignInUseCase,
  });
}
