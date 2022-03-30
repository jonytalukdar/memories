import React from 'react';
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons';

const Likes = ({ likes, userId }) => {
  if (likes?.length > 0) {
    return likes.find((like) => like._id === userId) ? (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;
        {likes.length > 2
          ? `You and ${likes.length - 1} others`
          : ` ${likes.length} like${likes.length > 1 ? 's' : ''}`}
      </>
    ) : (
      <>
        <ThumbUpAlt fontSize="small" /> &nbsp;
        {likes.length} {likes.length === 1 ? 'like' : 'likes'}
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
