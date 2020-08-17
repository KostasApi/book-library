import React from 'react';
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

import RowsLoader from 'components/loader/RowsLoader';
import Message from 'components/message/Message';

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

export default function Books({ books, loading, error, dispatch }) {
  const classes = useStyles();

  return loading ? (
    <>
      <Skeleton variant="circle" className={classes.loadingIcon}>
        <Avatar />
      </Skeleton>
      <RowsLoader height={45} numberOfRows={5} />
    </>
  ) : (
    <>
      <Fab color="primary" size="small" className={classes.addIcon}>
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
                <IconButton edge="end">
                  <Visibility />
                </IconButton>
                <IconButton edge="end">
                  <Edit />
                </IconButton>
                <IconButton edge="end">
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
    </>
  );
}
