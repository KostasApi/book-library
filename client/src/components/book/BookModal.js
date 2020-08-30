import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import {
  CREATE_BOOK,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAIL,
  UPDATE_BOOK,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAIL,
} from 'actions/booksActions';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: 360,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  actions: {
    padding: theme.spacing(1, 3, 2, 0),
  },
}));

export default function BookModal({
  open,
  setOpen,
  selectedBook,
  header,
  message,
  action,
  readOnly = true,
  dispatch,
  userInfo,
}) {
  const classes = useStyles();

  const { title, author, description } = selectedBook;

  const [book, setBook] = useState(
    action === 'Save'
      ? { title: '', author: '', description: '' }
      : { title, author, description }
  );

  const onBookChange = e => {
    const { name, value } = e.target;
    setBook(prevBook => {
      return { ...prevBook, [name]: value };
    });
  };

  const onSaveClick = async () => {
    dispatch({ type: CREATE_BOOK });

    try {
      const { data: result } = await axios({
        method: 'post',
        url: '/api/v1/books',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        data: book,
      });
      dispatch({ type: CREATE_BOOK_SUCCESS, payload: result.data });
    } catch (error) {
      console.log('error :>> ', error);
      dispatch({ type: CREATE_BOOK_FAIL, error: error.response.data.error });
    }
  };

  const onUpdateClick = async () => {
    dispatch({ type: UPDATE_BOOK });

    try {
      const { data: result } = await axios({
        method: 'put',
        url: `/api/v1/books/${selectedBook._id}`,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        data: book,
      });
      dispatch({ type: UPDATE_BOOK_SUCCESS, payload: result.data });
    } catch (error) {
      console.log('error :>> ', error);
      dispatch({ type: UPDATE_BOOK_FAIL, error: error.response.data.error });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className={classes.dialog}
    >
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={book.title}
                onChange={onBookChange}
                disabled={readOnly}
                error={book.title && book.title.length < 2}
                helperText={
                  book.title &&
                  book.title.length < 2 &&
                  'Title must be at least 2 characters long.'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="author"
                label="Author"
                name="author"
                value={book.author}
                onChange={onBookChange}
                disabled={readOnly}
                error={book.author && book.author.length < 2}
                helperText={
                  book.author &&
                  book.author.length < 2 &&
                  'Author must be at least 2 characters long.'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                id="description"
                label="Summary"
                multiline
                rows={10}
                value={book.description}
                onChange={onBookChange}
                disabled={readOnly}
                error={book.description && book.description.length > 500}
                helperText={
                  book.description &&
                  book.description.length > 500 &&
                  'Summary can not be xcmore than 500 characters long.'
                }
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          onClick={() => setOpen(false)}
          color="primary"
          variant="contained"
        >
          {readOnly ? 'Close' : 'Cancel'}
        </Button>

        {action && (
          <Button
            onClick={() => {
              setOpen(false);
              action === 'Save' ? onSaveClick() : onUpdateClick();
            }}
            color="secondary"
            variant="contained"
          >
            {action}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
