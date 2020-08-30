import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApi = (
  dispatch,
  actions = {
    fetch: '',
    success: '',
    fail: '',
  },
  initialUrl,
  requestOptions = {}
) => {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    let didCancel = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: actions.fetch });

      try {
        const { data: result } = await axios({
          method: 'get',
          url,
          ...requestOptions,
        });

        if (!didCancel) {
          dispatch({ type: actions.success, payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({
            type: actions.fail,
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
