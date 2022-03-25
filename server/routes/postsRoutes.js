import express from 'express';
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/postController.js';
import authenctication from '../middleware/authentication.js';

const router = express.Router();

router.get('/', getAllPosts);

router.post('/', authenctication, createPost);

router.patch('/:id', authenctication, updatePost);

router.delete('/:id', authenctication, deletePost);

router.patch('/:id/likePost', authenctication, likePost);

export default router;
