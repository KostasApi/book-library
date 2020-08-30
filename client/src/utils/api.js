import axios from 'axios';

import { SET_USER_ERROR } from 'actions/userActions';

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
            type: SET_USER_ERROR,
            error: 'Token has expired, please sign in.',
          });
        }
        return Promise.reject(error);
      }
    );
  },
};
