import React from 'react';
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons';

const Likes = ({ post }) => {
  if (post.likes.length > 0) {
    return post.likes.find(
      (like) => like._id === (post?.result?.googleId || post?.result?._id)
    ) ? (
      <>
        <ThumbUpAlt fontSize="small" />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : ` ${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" /> &nbsp;
        {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
      </>
    );
  }

  return (
    <>
      <ThumbUpAltOutlined />
      &nbsp; Like
    </>
  );
};

export default Likes;
