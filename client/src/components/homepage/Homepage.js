import React from 'react';
import { Container, Grid } from '@material-ui/core';

import Header from 'components/header/Header';
import Banner from 'components/banner/Banner';
import Footer from 'components/footer/Footer';
import BookCard from 'components/book/BookCard';
import booklist from './booklist.json';

export default function Homepage() {
  return (
    <Container maxWidth="lg">
      <Header title="Book Library" />
      <Banner />
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
