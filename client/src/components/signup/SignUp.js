import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Container,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  CLEAR_USER_ERROR,
} from 'actions/userActions';
import { UserContext } from 'context/userContext';
import Spinner from 'components/loader/Spinner';
import Message from 'components/message/Message';
import validateEmail from 'utils/validateEmail';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cancel: {
    margin: theme.spacing(1, 0, 2),
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [{ userInfo, loading, error }, dispatch] = useContext(UserContext);

  const onSubmit = async e => {
    e.preventDefault();
    dispatch({ type: SIGN_UP });

    try {
      const { data: result } = await axios.post('/api/v1/users/signup', user);
      dispatch({ type: SIGN_UP_SUCCESS, payload: { user: result.data } });
    } catch (error) {
      console.log('error :>> ', error);
      dispatch({ type: SIGN_UP_FAIL, error: error.response.data.error });
    }
  };

  const onInputChange = e => {
    const { name, value } = e.target;
    setUser(prevUserCredentials => {
      return { ...prevUserCredentials, [name]: value };
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      {userInfo && <Redirect to="/signin" />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                value={user.firstname}
                onChange={onInputChange}
                error={user.firstname && user.firstname.length < 2}
                helperText={
                  user.firstname &&
                  user.firstname.length < 2 &&
                  'First name must be at least 2 characters long.'
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
                value={user.lastname}
                onChange={onInputChange}
                error={user.lastname && user.lastname.length < 2}
                helperText={
                  user.lastname &&
                  user.lastname.length < 2 &&
                  'Last name must be at least 2 characters long.'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={onInputChange}
                error={
                  user.email && (!user.email || !validateEmail(user.email))
                }
                helperText={
                  user.email &&
                  (!user.email.length || !validateEmail(user.email)) &&
                  'Please use a valid email address.'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={onInputChange}
                error={user.password && user.password.length < 6}
                helperText={
                  user.password &&
                  user.password.length < 6 &&
                  'Password must be at least 6 characters long.'
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.cancel}
            component={Link}
            to="/home"
          >
            Cancel
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2" className={classes.link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Spinner show={loading} />
      <Message
        show={!!error}
        message={error}
        severity="error"
        dispatch={dispatch}
        dispatchType={CLEAR_USER_ERROR}
      />
    </Container>
  );
}
