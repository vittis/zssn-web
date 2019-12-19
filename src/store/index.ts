import { createStore, Store } from 'redux';

import rootReducer from './ducks/rootReducer';
import { ErrorState } from './ducks/error/types';
import { setupInterceptors } from '../services/api';

export interface ApplicationState {
  error: ErrorState;
}

const store: Store<ApplicationState> = createStore(rootReducer);

setupInterceptors(store);

export default store;
