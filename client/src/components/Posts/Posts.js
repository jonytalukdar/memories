import React from 'react';
import { useSelector } from 'react-redux';

const Posts = () => {
  const { posts } = useSelector((state) => state);
  console.log(posts);
  return (
    <>
      <h1>Posts</h1>
    </>
  );
};

export default Posts;
