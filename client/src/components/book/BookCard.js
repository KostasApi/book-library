import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

import bookDefaultImage from 'assets/images/default-book.jpg';

const useStyles = makeStyles({
  card: {
    height: '100%',
  },
  description: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 5,
  },
});

export default function BookCard({ book }) {
  const classes = useStyles();
  const { title, author, description } = book;
  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={bookDefaultImage}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" noWrap>
          {title}
        </Typography>
        <Typography gutterBottom variant="subtitle2" noWrap>
          {author}
        </Typography>
        <Typography
          className={classes.description}
          variant="body2"
          color="textSecondary"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
