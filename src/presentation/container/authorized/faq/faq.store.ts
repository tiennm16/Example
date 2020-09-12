import {RemoteUnsplashDataSource, UnsplashPhoto} from '@data';
import {createStore, StoreActionApi, createHook} from 'react-sweet-state';
import {container} from 'tsyringe';

export type FAQState = {
  data: UnsplashPhoto[];
  page: number;
  refreshing: boolean;
};

const INITIAL_STATE: FAQState = {
  data: [],
  page: 1,
  refreshing: true,
};

const FAQStore = createStore({
  name: 'faq',
  initialState: INITIAL_STATE,
  actions: {
    refresh: () => async ({setState}: StoreActionApi<FAQState>) => {
      setState({refreshing: true});
      const dataSource = container.resolve<RemoteUnsplashDataSource>(
        'RemoteUnsplashDataSource',
      );
      try {
        const result = await dataSource.getPhotos(1).toPromise();
        setState({
          data: result,
          refreshing: false,
          page: 1,
        });
      } catch (error) {
        setState({refreshing: false});
      }
    },
  },
});

export const useFAQHook = createHook(FAQStore);
