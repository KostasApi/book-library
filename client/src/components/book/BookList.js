import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { debounce } from 'lodash';

import { UserContext } from 'context/userContext';
import { useApi } from 'hooks/useApi';
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

  const [{ userInfo }, dispatch] = useContext(UserContext);

  const {
    user: { firstname, lastname },
  } = userInfo;

  const [filters, setFilters] = useState({
    title: '',
    author: '',
    description: '',
  });

  const [state, setUrl] = useApi(null, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  });

  const { data, error, loading } = state;

  const books = data?.data || [];

  const callApi = useCallback(
    debounce(url => {
      setUrl(url);
    }, 1000),
    []
  );

  const onInputChange = (name, value) => {
    setFilters(prevFilters => {
      return { ...prevFilters, [name]: value };
    });
  };

  useEffect(() => {
    let url = '/api/v1/books';
    let query = '?';

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        query = `${query}${key}=${value}&`;
      }
    });

    url = `${url}${query}`;

    callApi(url);
  }, [filters, callApi]);

  return (
    <Container className={classes.booklist} maxWidth="lg">
      <Header title="Book Library" />
      <Banner
        title="Welcome"
        subtitle={`Enjoy your favourite books,  ${firstname} ${lastname}`}
      />
      <BookFilters filters={filters} setFilter={onInputChange} />
      <Books
        books={books}
        error={error}
        loading={loading}
        dispatch={dispatch}
      />
      <Footer />
    </Container>
  );
}
