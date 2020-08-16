import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  skeleton: {
    borderRadius: 5,
    margin: '10px 0',
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
