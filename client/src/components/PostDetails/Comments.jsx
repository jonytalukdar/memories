import React, { useState, useRef, useEffect } from 'react';

import useStyles from './styles';
import { Typography, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../actions/posts';

const Comments = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentRef = useRef();

  const { post: newPost } = useSelector((state) => state.posts);

  const [newComments, setNewComments] = useState(newPost.comments);
  const [comment, setComment] = useState('');

  const [isScroll, setIsScroll] = useState(false);

  const handleComment = (e) => {
    e.preventDefault();
    const finalComment = {
      name: user.result.name,
      comment,
    };

    dispatch(postComment(finalComment, post._id));

    setNewComments((prevState) => [...prevState, finalComment]);
    setComment('');

    setIsScroll(true);
  };

  useEffect(() => {
    if (isScroll) {
      commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h5">
            Comments
          </Typography>
          {newComments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.name.split(' ')[0]} : </strong>
              {c.comment}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h5">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
