import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from 'context/userContext';
import { BooksContextProvider } from 'context/booksContext';
import Header from 'components/header/Header';
import Banner from 'components/banner/Banner';
import Footer from 'components/footer/Footer';
import BookFilters from './BookFilters';
import Books from './Books';

const useStyles = makeStyles(theme => ({
  booklist: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function BookList() {
  const classes = useStyles();

  const [{ userInfo, error }] = useContext(UserContext);

  const {
    user: { firstname, lastname },
  } = userInfo;

  const [filters, setFilters] = useState({
    title: '',
    author: '',
    description: '',
  });

  const onInputChange = (name, value) => {
    setFilters(prevFilters => {
      return { ...prevFilters, [name]: value };
    });
  };

  return error ? (
    <Redirect to="/signout" />
  ) : (
    <BooksContextProvider>
      <Container className={classes.booklist} maxWidth="lg">
        <Header title="Book Library" />
        <Banner
          title="Welcome"
          subtitle={`Enjoy your favourite books,  ${firstname} ${lastname}`}
        />
        <BookFilters filters={filters} setFilter={onInputChange} />
        <Books userInfo={userInfo} filters={filters} />
        <Footer />
      </Container>
    </BooksContextProvider>
  );
}
