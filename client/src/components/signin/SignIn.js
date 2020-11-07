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
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  CLEAR_USER_ERROR,
} from 'actions/userActions';
import { CLEAR_ERROR } from 'actions/errorActions';
import { UserContext } from 'context/userContext';
import { ErrorContext } from 'context/errorContext';
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
    marginTop: theme.spacing(1),
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

export default function SignIn() {
  const classes = useStyles();

  const [userCredentials, setUserCredentials] = useState({
    email: 'john@test.com',
    password: '123456',
  });

  const [{ userInfo, loading, error }, dispatch] = useContext(UserContext);
  const [{ error: generalError }, generalErrorDispatch] = useContext(
    ErrorContext
  );

  const onSubmit = async e => {
    e.preventDefault();
    dispatch({ type: SIGN_IN });

    try {
      const { data: result } = await axios.post(
        '/api/v1/users/signin',
        userCredentials
      );
      dispatch({ type: SIGN_IN_SUCCESS, payload: result.data });
    } catch (error) {
      console.log('error :>> ', error);
      dispatch({ type: SIGN_IN_FAIL, error: error.response.data.error });
    }
  };

  const onInputChange = e => {
    const { name, value } = e.target;
    setUserCredentials(prevUserCredentials => {
      return { ...prevUserCredentials, [name]: value };
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      {userInfo?.token && <Redirect to="/booklist" />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userCredentials.email}
            onChange={onInputChange}
            error={
              userCredentials.email &&
              (!userCredentials.email || !validateEmail(userCredentials.email))
            }
            helperText={
              userCredentials.email &&
              (!userCredentials.email.length ||
                !validateEmail(userCredentials.email)) &&
              'Please use a valid email address.'
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userCredentials.password}
            onChange={onInputChange}
            error={
              userCredentials.password && userCredentials.password.length < 6
            }
            helperText={
              userCredentials.password &&
              userCredentials.password.length < 6 &&
              'Password must be at least 6 characters long.'
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign In
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
              <Link to="/signup" variant="body2" className={classes.link}>
                {"Don't have an account? Sign Up"}
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
      <Message
        show={!!generalError}
        message={generalError}
        severity="error"
        dispatch={generalErrorDispatch}
        dispatchType={CLEAR_ERROR}
      />
    </Container>
  );
}
