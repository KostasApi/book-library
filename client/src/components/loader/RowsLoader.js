import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  skeleton: {
    borderRadius: 5,
    margin: theme.spacing(1, 0),
  },
}));

export default function ListLoader({ height, numberOfRows }) {
  const classes = useStyles();

  return [...Array(numberOfRows)].map((x, index) => (
    <Skeleton
      key={index}
      className={classes.skeleton}
      variant="rect"
      component="p"
      height={height}
    />
  ));
}
