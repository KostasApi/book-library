import {
  FETCH_BOOKS,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAIL,
  CREATE_BOOK,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAIL,
  UPDATE_BOOK,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAIL,
  DELETE_BOOK,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
  CLEAR_BOOKS_ERROR,
} from 'actions/booksActions';

export const initialState = {
  books: [],
  loading: false,
  error: null,
};

export default function userReducer(state, action) {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        books: action.payload,
      };
    case FETCH_BOOKS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CREATE_BOOK:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        books: [action.payload, ...state.books],
      };
    case CREATE_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        books: state.books.map(book =>
          book._id === action.payload._id ? action.payload : book
        ),
      };
    case UPDATE_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DELETE_BOOK:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        books: state.books.filter(book => book._id !== action.payload._id),
      };
    case DELETE_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CLEAR_BOOKS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
