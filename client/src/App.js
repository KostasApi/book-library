import React from 'react';
import { CssBaseline } from '@material-ui/core';

import AppRouter from 'routes/AppRouter';

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppRouter />
    </>
  );
}
