import React, { useReducer, createContext } from 'react';

export const UserContext = createContext();

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        loading: true,
      };
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };
    case 'SIGN_IN_FAIL':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'SIGN_UP':
      return {
        ...state,
        loading: true,
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };
    case 'SIGN_UP_FAIL':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        userInfo: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
