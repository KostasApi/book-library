import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { UserContext } from 'context/userContext';

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
  },
  userIcon: {
    '& svg': {
      fontSize: 32,
    },
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

export default function Header({ title }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [{ userInfo }, dispatch] = useContext(UserContext);

  const onSignOut = () => {
    setIsMenuOpen(false);
    dispatch({
      type: 'SIGN_OUT',
    });
  };

  const onUserIconClick = e => {
    setAnchorEl(e.currentTarget);
    setIsMenuOpen(true);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
    >
      {/* <MenuItem onClick={() => setIsMenuOpen(false)}>
        <Link className={classes.link} to="/home">
          Profile
        </Link>
      </MenuItem> */}
      <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
    </Menu>
  );

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
      {userInfo?.token ? (
        <Tooltip
          title={`${userInfo.user.firstname} ${userInfo.user.lastname}`}
          arrow
        >
          <IconButton
            className={classes.userIcon}
            edge="end"
            onClick={onUserIconClick}
          >
            <AccountCircle />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Button
            variant="outlined"
            size="small"
            className={classes.singupButton}
            component={Link}
            to="/signup"
          >
            Sign up
          </Button>
          <Button variant="outlined" size="small" component={Link} to="/signin">
            Sign in
          </Button>
        </>
      )}
      {renderMenu}
    </Toolbar>
  );
}

// Header.propTypes = {
//   title: PropTypes.string,
// };
