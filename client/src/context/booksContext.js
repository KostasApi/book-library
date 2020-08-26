import React, { useReducer, createContext } from 'react';
import booksReducer, { initialState } from 'reducers/booksReducer';

export const BooksContext = createContext();

export const BooksContextProvider = props => {
  const [state, dispatch] = useReducer(booksReducer, initialState);

  return (
    <BooksContext.Provider value={[state, dispatch]}>
      {props.children}
    </BooksContext.Provider>
  );
};
