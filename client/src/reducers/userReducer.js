import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_OUT,
  SET_USER_ERROR,
  CLEAR_USER_ERROR,
} from 'actions/userActions';

export const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

export default function userReducer(state, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SIGN_UP:
      return {
        ...state,
        loading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SIGN_OUT:
      return {
        ...state,
        userInfo: null,
      };
    case SET_USER_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
