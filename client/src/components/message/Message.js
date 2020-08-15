import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function Message({
  show,
  message,
  severity = 'info',
  dispatch,
  dispatchType,
}) {
  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={5000}
      onClose={() => dispatch({ type: dispatchType })}
    >
      <Alert
        onClose={() => dispatch({ type: dispatchType })}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
