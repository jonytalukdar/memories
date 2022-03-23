import React from 'react';
import useStyles from './Styles';
import Post from './Post/Post';

const Posts = () => {
  const classes = useStyles();
  return (
    <div>
      <h1>Posts</h1>
      <Post />
    </div>
  );
};

export default Posts;
