import React, { useEffect } from 'react';

import useStyles from './styles.js';

import {
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, getPostsBySearch } from '../../actions/posts.js';
import Comments from './Comments.jsx';

const PostDetails = () => {
  const classes = useStyles();

  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  //for single post
  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  //for recomended post
  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: 'none', tags: post?.tags?.join(',') })
      );
    }
  }, [post, dispatch]);

  if (isLoading) {
    return (
      <Paper className={classes.loadingPaper} elevation={5}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recomendedPost = posts?.filter(({ _id }) => _id !== post._id);

  const openPost = (id) => {
    history.push(`/posts/${id}`);
  };

  return (
    <Paper style={{ borderRadiues: '12px', padding: '20px' }} elevation={5}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.creator}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          {/* <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography> */}
          {/* <Divider style={{ margin: '20px 0' }} /> */}
          <Comments post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
      {recomendedPost.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recomendedPost.map((post) => {
              const { title, creator, _id, likes, message, selectedFile } =
                post;
              return (
                <div
                  style={{ margin: '20px', cursor: 'pointer' }}
                  key={_id}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {creator}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} alt={title} width="200px" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
