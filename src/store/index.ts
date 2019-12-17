import { createStore, Store } from 'redux';

import rootReducer from './ducks/rootReducer';
import { ErrorState } from './ducks/error/types';

export interface ApplicationState {
  error: ErrorState;
}

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;
