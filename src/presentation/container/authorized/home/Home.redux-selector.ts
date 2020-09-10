import { Selector } from 'react-redux';
import { RootStoreState } from '@shared-state';
import { HomeReduxSelectionState } from './types';

export const homeSelector: Selector<
    RootStoreState,
    HomeReduxSelectionState
> = (state) => {
    return {
        isAuthenticating: state.authentication.isAuthenticating,
    };
};
