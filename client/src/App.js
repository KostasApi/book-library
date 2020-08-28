import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ErrorBoundary from './ErrorBoundary';
import AppRouter from 'routes/AppRouter';
import { UserContextProvider } from 'context/userContext';

const useStyles = makeStyles(theme => ({
  app: {
    minWidth: '360px',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <ErrorBoundary>
      <UserContextProvider>
        <div className={classes.app}>
          <CssBaseline />
          <AppRouter />
        </div>
      </UserContextProvider>
    </ErrorBoundary>
  );
}
