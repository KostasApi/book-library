import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '360px',
    padding: 0,
    marginTop: theme.spacing(4),
  },
  footer: {
    padding: theme.spacing(2, 2),
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <footer className={classes.footer}>
        <Grid container justify="space-between">
          <Typography variant="body1" color="textSecondary">
            My sticky footer can be found here.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {'Copyright © '}
            <a color="inherit" href="https://github.com/KostasApi/book-library">
              KostasApi
            </a>
            {` ${new Date().getFullYear()}`}
          </Typography>
        </Grid>
      </footer>
    </Container>
  );
}
