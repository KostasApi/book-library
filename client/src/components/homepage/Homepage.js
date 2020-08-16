import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from 'components/header/Header';
import Banner from 'components/banner/Banner';
import Footer from 'components/footer/Footer';
import BookCard from 'components/book/BookCard';
import booklist from './booklist.json';

const useStyles = makeStyles(theme => ({
  homepage: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function Homepage() {
  const classes = useStyles();

  return (
    <Container className={classes.homepage} maxWidth="lg">
      <Header title="Book Library" />
      <Banner title="Welcome" subtitle="Enjoy your favourite books" />
      <Grid container spacing={4}>
        {booklist.map(book => (
          <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Container>
  );
}
