import mongoose from 'mongoose';
import Post from '../models/postsModel.js';

//get all post
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt');
    res
      .status(200)
      .json({ status: 'success', nbHits: posts.length, data: posts });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body });
    res.status(201).json({ status: 'success', data: post });
  } catch (error) {
    console.log(error);
  }
};

//update post
export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send({ message: 'Post not found!' });

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: updatedPost });
  } catch (error) {
    console.log(error);
  }
};

//delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send({ message: 'Post not found!' });

  try {
    const post = await Post.findOneAndDelete({ _id: id });
    res.status(200).json({ status: 'success', data: post });
  } catch (error) {
    console.log(error);
  }
};

//like post

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send({ message: 'Post not found!' });

  try {
    const post = await Post.findById({ _id: id });

    const index = post.likes.findIndex((id) => id === String(req.userId));
    console.log(index);

    if (index === -1) {
      //like the post
      post.likes.push(req.userId);
    } else {
      //dislike the post
      post.likes = post.likes.filter((id) => id !== String(userId));
    }

    const updatedLike = await Post.findByIdAndUpdate(
      id,
      { likesCount: post },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ status: 'success', data: updatedLike });
  } catch (error) {
    console.log(error);
  }
};
