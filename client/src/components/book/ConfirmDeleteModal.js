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
  header,
  message,
  selectedBook,
}) {
  const classes = useStyles();

  const { title } = selectedBook;

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
          onClick={() => setOpen(false)}
          color="secondary"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
