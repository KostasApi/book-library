import { SET_ERROR, CLEAR_ERROR } from 'actions/errorActions';

export const initialState = {
  error: null,
  status: null,
};

export default function userReducer(state, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        status: action.status,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        status: null,
      };
    default:
      return state;
  }
}
