import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from '@material-ui/core/';

import { DeleteOutline, MoreHoriz } from '@material-ui/icons';

import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import Likes from './Like';
import { deletePost, likePost } from '../../../services/service';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);

  const hasLiked = post.likes.find(
    (like) => like._id === (post?.result?.googleId || post?.result?._id)
  );
  const userId = user?.result?._id || user?.result?.googleId;

  //states
  const [likes, setLikes] = useState(post?.likes);

  const handleLike = async () => {
    await dispatch(likePost(post._id));

    if (hasLiked) {
      await setLikes(post?.likes?.filter((id) => id !== userId));
    } else {
      await setLikes([...post.likes, userId]);
    }
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        {user?.result?.googleId === post?.creatorId ||
          (user?.result?._id === post?.creatorId && (
            <div className={classes.overlay2} name="edit">
              {/* <button> */}
              <MoreHoriz
                fontSize="medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                }}
                style={{ color: 'white' }}
                size="small"
              />
              {/* </button> */}
            </div>
          ))}

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={handleLike}
          disabled={!user?.result}
        >
          <Likes likes={likes} userId={userId} />
        </Button>
        {user?.result?.googleId === post?.creatorId ||
          (user?.result?._id === post?.creatorId && (
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteOutline fontSize="small" />
            </Button>
          ))}
      </CardActions>
    </Card>
  );
};

export default Post;
