import express from 'express';
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getSinglePost,
  postComment,
} from '../controllers/postController.js';
import authenctication from '../middleware/authentication.js';

const router = express.Router();

router.get('/', getAllPosts);

router.get('/search', getPostsBySearch);

router.post('/', authenctication, createPost);

router.get('/:id', getSinglePost);

router.patch('/:id', authenctication, updatePost);

router.delete('/:id', authenctication, deletePost);

router.patch('/:id/likePost', authenctication, likePost);
router.post('/:id/postComment', authenctication, postComment);

export default router;
