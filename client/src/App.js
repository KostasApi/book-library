import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AppRouter from 'routes/AppRouter';

const useStyles = makeStyles(theme => ({
  app: {
    minWidth: '360px',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <CssBaseline />
      <AppRouter />
    </div>
  );
}
