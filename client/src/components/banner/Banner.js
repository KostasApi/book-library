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
    backgroundImage: `url(${library})`,
    minHeight: '25vh',
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

export default function Banner({ title, subtitle }) {
  const classes = useStyles();
  return (
    <Paper className={classes.banner}>
      <Grid container>
        <Grid item md={6}>
          <div className={classes.innerBanner}>
            <Typography variant="h3" color="inherit" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {subtitle}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
