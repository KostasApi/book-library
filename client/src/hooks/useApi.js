import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const dataFetchReducer = (state, action) => {
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
};

export const useApi = (initialUrl, requestOptions = {}, initialData = null) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: null,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_DATA' });

      try {
        const { data: result } = await axios({
          method: 'get',
          url,
          ...requestOptions,
        });

        if (!didCancel) {
          dispatch({ type: 'FETCH_DATA_SUCCESS', payload: result });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({
            type: 'FETCH_DATA_FAIL',
            error: error.response.data.error,
          });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
