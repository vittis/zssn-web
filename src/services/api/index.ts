import axios from 'axios';
import { Store } from 'redux';
import { ApplicationState } from '../../store';
import { setError } from '../../store/ducks/error/actions';

const api = axios.create({
  baseURL: 'http://localhost:3030',
});

const BAD_REQUEST = 400;

export const setupInterceptors = (store: Store<ApplicationState>) => {
  const { dispatch } = store;

  api.interceptors.response.use(
    response => {
      return response;
    },
    /* Deal with response errors */
    error => {
      const { status } = error.response;
      const { data } = error.response;
      if (status === BAD_REQUEST) {
        dispatch(setError(data ? data : 'Something went wrong... :('));
      }
      return Promise.reject(error);
    },
  );
};

export default api;
