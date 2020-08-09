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
    padding: 0,
  },
  toolbarTitle: {
    flex: 1,
  },
  singupButton: {
    margin: '0 10px',
    minWidth: '73px',
  },
  singinButton: {
    minWidth: '69px',
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
        className={classes.singupButton}
        component={Link}
        to="/signup"
      >
        Sign up
      </Button>
      <Button
        variant="outlined"
        size="small"
        className={classes.singinButton}
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
