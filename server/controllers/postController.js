import Post from '../models/postsModel.js';

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
