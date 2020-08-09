import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  button: {
    margin: '0 5px',
  },
}));

export default function Header({ title }) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        className={classes.toolbarTitle}
      >
        {title}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        className={classes.button}
        component={Link}
        to="/signup"
      >
        Sign up
      </Button>
      <Button
        variant="outlined"
        size="small"
        className={classes.button}
        component={Link}
        to="/signin"
      >
        Sign in
      </Button>
    </Toolbar>
  );
}

// Header.propTypes = {
//   title: PropTypes.string,
// };
