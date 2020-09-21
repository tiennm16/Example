import {registerDataDependencies} from './DataModule';
import {container} from 'tsyringe';
import {StoreContainer, configureStore} from '@shared-state';
import {registerRepositoryDependencies} from './RepositoryModule';
import {registerUseCaseDependencies} from './UseCaseModule';

function registerDependencies() {
  registerDataDependencies();
  registerRepositoryDependencies();
  registerUseCaseDependencies();
}

function registerFlyValue() {
  container.register<StoreContainer>('StoreContainer', {
    useValue: configureStore(),
  });
}

export {registerDependencies, registerFlyValue, container};
