import React from 'react';
import { Grid, TextField, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  filtersContainer: {
    marginBottom: theme.spacing(4),
  },
  titleFilter: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  authorFilter: {
    padding: theme.spacing(0, 1),
  },
  summaryFilter: {
    padding: theme.spacing(0, 0, 0, 1),
  },
  closeIcon: {
    padding: 0,
  },
}));

export default function BookFilters({ filters, setFilter }) {
  const classes = useStyles();

  const { title, author, description } = filters;

  return (
    <Grid
      className={classes.filtersContainer}
      container
      wrap="nowrap"
      justify="space-between"
    >
      <Grid className={classes.titleFilter} item xs={12} sm={6} md={4}>
        <TextField
          variant="outlined"
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          size="small"
          value={title}
          onChange={e => setFilter('title', e.target.value)}
          InputProps={{
            endAdornment: title && (
              <IconButton
                className={classes.closeIcon}
                onClick={() => setFilter('title', '')}
              >
                <Close />
              </IconButton>
            ),
          }}
        />
      </Grid>
      <Grid className={classes.authorFilter} item xs={12} sm={6} md={4}>
        <TextField
          variant="outlined"
          fullWidth
          id="author"
          label="Author"
          name="author"
          autoComplete="author"
          size="small"
          value={author}
          onChange={e => setFilter('author', e.target.value)}
          InputProps={{
            endAdornment: author && (
              <IconButton
                className={classes.closeIcon}
                onClick={() => setFilter('author', '')}
              >
                <Close />
              </IconButton>
            ),
          }}
        />
      </Grid>
      <Grid className={classes.summaryFilter} item xs={12} sm={6} md={4}>
        <TextField
          variant="outlined"
          fullWidth
          id="summary"
          label="Summary"
          name="description"
          autoComplete="summary"
          size="small"
          value={description}
          onChange={e => setFilter('description', e.target.value)}
          InputProps={{
            endAdornment: description && (
              <IconButton
                className={classes.closeIcon}
                onClick={() => setFilter('description', '')}
              >
                <Close />
              </IconButton>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}
