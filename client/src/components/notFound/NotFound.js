import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import magnifyingGlass from 'assets/images/cluzo.svg';

const useStyles = makeStyles(theme => ({
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    textAlign: 'center',
  },
  card: {
    boxShadow: 'none',
  },
  media: {
    height: 300,
    backgroundSize: 'contain',
    backgroundColor: '#fafafa',
  },
  button: {
    width: 160,
    display: 'flex',
    alignSelf: 'center',
    margin: theme.spacing(1, 0),
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <Container className={classes.notFound} maxWidth="sm">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={magnifyingGlass}
          title="Page Not Found"
        />
      </Card>
      <Typography component="h1" variant="h3">
        Page not found
      </Typography>
      <Typography component="h2" variant="body1">
        Sorry we can’t find the page you are looking for.
      </Typography>
      <Button
        variant="outlined"
        className={classes.button}
        component={Link}
        to="/home"
      >
        Back to Home
      </Button>
    </Container>
  );
}
