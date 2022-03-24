import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = () => {
  const classes = useStyles();
  const { posts } = useSelector((state) => state);

  if (posts.length === 0) {
    return <CircularProgress />;
  }
  console.log(posts);

  return (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => {
        return (
          <Grid item key={post._id} xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
