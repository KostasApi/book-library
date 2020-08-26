export const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function userReducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case 'FETCH_DATA_FAIL':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
}
