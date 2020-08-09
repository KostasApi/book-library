import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 393px)',
  },
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Grid container justify="space-between">
            <Typography variant="body1" color="textSecondary">
              My sticky footer can be found here.
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {'Copyright © '}
              <a
                color="inherit"
                href="https://github.com/KostasApi/book-library"
              >
                KostasApi
              </a>
              {` ${new Date().getFullYear()}`}
            </Typography>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}
