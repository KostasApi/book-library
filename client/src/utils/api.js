import axios from 'axios';

import { SET_ERROR } from 'actions/errorActions';

export default {
  setupInterceptors: dispatch => {
    // response interceptor
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 401) {
          // handle error: inform user, go to signin page
          dispatch({
            type: SET_ERROR,
            error: 'Token has expired, please sign in.',
            status: error.response.status,
          });
        }

        if (error.response.status === 429) {
          // handle error: Too many requests
          dispatch({
            type: SET_ERROR,
            error: 'Too many requests, please try again later.',
            status: error.response.status,
          });
        }
        return Promise.reject(error);
      }
    );
  },
};
