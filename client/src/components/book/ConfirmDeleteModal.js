import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import {
  DELETE_BOOK,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
} from 'actions/booksActions';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: 360,
  },
  actions: {
    justifyContent: 'center',
    padding: theme.spacing(3, 1),
  },
  deletedBook: {
    fontWeight: 700,
  },
}));

export default function ConfirmDeleteModal({
  open,
  setOpen,
  selectedBook,
  dispatch,
  userInfo,
}) {
  const classes = useStyles();

  const { title } = selectedBook;

  const onDeleteClick = async () => {
    dispatch({ type: DELETE_BOOK });

    try {
      const { data: result } = await axios({
        method: 'delete',
        url: `/api/v1/books/${selectedBook._id}`,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: DELETE_BOOK_SUCCESS, payload: result.data });
    } catch (error) {
      console.log('error :>> ', error);
      dispatch({ type: DELETE_BOOK_FAIL, error: error.response.data.error });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className={classes.dialog}
    >
      <DialogTitle>Delete Book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete book:
          <Typography
            variant="subtitle1"
            component="span"
            className={classes.deletedBook}
          >
            {title}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          onClick={() => setOpen(false)}
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>

        <Button
          onClick={() => {
            setOpen(false);
            onDeleteClick();
          }}
          color="secondary"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
