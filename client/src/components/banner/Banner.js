import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import library from 'assets/images/library.jpg';

const useStyles = makeStyles(theme => ({
  banner: {
    position: 'relative',
    color: theme.palette.common.white,
    margin: theme.spacing(4, 0, 4),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  innerBanner: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(9),
      paddingRight: 0,
    },
  },
}));

export default function Banner() {
  const classes = useStyles();
  return (
    <Paper
      className={classes.banner}
      style={{ backgroundImage: `url(${library})` }}
    >
      <Grid container>
        <Grid item md={6}>
          <div className={classes.innerBanner}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              Test title
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Test description
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
