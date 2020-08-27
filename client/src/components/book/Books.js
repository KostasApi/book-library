import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Fab,
  Avatar,
} from '@material-ui/core';
import { Delete, Edit, Visibility, Add } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { debounce } from 'lodash';

import { useApi } from 'hooks/useApi';
import { BooksContext } from 'context/booksContext';
import RowsLoader from 'components/loader/RowsLoader';
import Message from 'components/message/Message';
import BookModal from './BookModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const useStyles = makeStyles(theme => ({
  summaryCell: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  summary: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    width: '30vw',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  addIcon: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignSelf: 'flex-end',
  },
  loadingIcon: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignSelf: 'flex-end',
  },
}));

export default function Books({ userInfo, filters }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  const [state, dispatch] = useContext(BooksContext);

  const { books, error, loading } = state;

  const [setUrl] = useApi(dispatch, null, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  });

  const callApi = useCallback(
    debounce(url => {
      setUrl(url);
    }, 500),
    []
  );

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

  return loading ? (
    <>
      <Skeleton variant="circle" className={classes.loadingIcon}>
        <Avatar />
      </Skeleton>
      <RowsLoader rowHeight={45} numberOfRows={5} />
    </>
  ) : (
    <>
      <Fab
        color="primary"
        size="small"
        className={classes.addIcon}
        onClick={() => {
          setOpen(true);
          setModalHeader('Create Book');
          setModalMessage('Book details');
          setModalAction('Save');
          setReadOnly(false);
        }}
      >
        <Add />
      </Fab>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell className={classes.summaryCell}>Summary</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(book => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className={classes.summaryCell}>
                <Typography
                  className={classes.summary}
                  gutterBottom
                  variant="body2"
                >
                  {book.description}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  edge="end"
                  onClick={() => {
                    setOpen(true);
                    setSelectedBook(book);
                    setModalHeader('View Book');
                    setModalMessage('Book details');
                    setModalAction('');
                    setReadOnly(true);
                  }}
                >
                  <Visibility />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => {
                    setOpen(true);
                    setSelectedBook(book);
                    setModalHeader('Update Book');
                    setModalMessage('Book details');
                    setModalAction('Update');
                    setReadOnly(false);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => {
                    setOpenDelete(true);
                    setSelectedBook(book);
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Message
        show={!!error}
        message={error}
        severity="error"
        dispatch={dispatch}
        dispatchType="CLEAR_ERROR"
      />
      {open && (
        <BookModal
          open={open}
          setOpen={setOpen}
          selectedBook={selectedBook}
          header={modalHeader}
          message={modalMessage}
          action={modalAction}
          readOnly={readOnly}
          dispatch={dispatch}
          userInfo={userInfo}
        />
      )}
      {openDelete && (
        <ConfirmDeleteModal
          open={openDelete}
          setOpen={setOpenDelete}
          selectedBook={selectedBook}
          dispatch={dispatch}
          userInfo={userInfo}
        />
      )}
    </>
  );
}
