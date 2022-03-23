import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
