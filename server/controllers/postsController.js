import Post from '../models/postModel.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res
      .status(200)
      .json({ status: 'success', nbHits: posts.length, data: posts });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  try {
    const newPost = await Post.create(body, { new: true });
    res.statu(201).json({ status: 'success', data: newPost });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
