import React from 'react';
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
}) {
  const classes = useStyles();

  const { title, author, description } = selectedBook;

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
                value={title}
                onChange={{}}
                disabled={readOnly}
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
                value={author}
                onChange={{}}
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Summary"
                multiline
                rows={10}
                value={description}
                onChange={{}}
                disabled={readOnly}
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
            onClick={() => setOpen(false)}
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
