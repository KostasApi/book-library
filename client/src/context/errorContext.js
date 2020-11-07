import React, { useReducer, createContext } from 'react';
import errorReducer, { initialState } from 'reducers/errorReducer';

export const ErrorContext = createContext();

export const ErrorContextProvider = props => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  return (
    <ErrorContext.Provider value={[state, dispatch]}>
      {props.children}
    </ErrorContext.Provider>
  );
};
