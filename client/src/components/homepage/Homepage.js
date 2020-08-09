import React from 'react';
import { Container } from '@material-ui/core';

import Header from 'components/header/Header';
import Banner from 'components/banner/Banner';
import Footer from 'components/footer/Footer';

export default function Homepage() {
  return (
    <Container maxWidth="lg">
      <Header title="Book Library" />
      <Banner />
      <Footer />
    </Container>
  );
}
