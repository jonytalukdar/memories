import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (isLoading) return <CircularProgress />;

  if (!posts.length && !isLoading) return <h2>No Posts are found!</h2>;

  return (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => {
        return (
          <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
