import {registerDatDependencies} from './DataModule';
import {container} from 'tsyringe';
import {StoreContainer, configureStore} from '@shared-state';
import {registerRepositoryDependencies} from './RepositoryModule';

function registerDependencies() {
  registerDatDependencies();
  registerRepositoryDependencies();
}

function registerFlyValue() {
  container.register<StoreContainer>('StoreContainer', {
    useValue: configureStore(),
  });
}

export {registerDependencies, registerFlyValue, container};
