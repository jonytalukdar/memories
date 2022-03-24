import mongoose from 'mongoose';
import Post from '../models/postsModel.js';

//get all post
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res
      .status(200)
      .json({ status: 'success', nbHits: posts.length, data: posts });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
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
