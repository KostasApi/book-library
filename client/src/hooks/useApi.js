import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApi = (dispatch, initialUrl, requestOptions = {}) => {
  const [url, setUrl] = useState(initialUrl);

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
          dispatch({ type: 'FETCH_DATA_SUCCESS', payload: result.data });
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

  return [setUrl];
};
