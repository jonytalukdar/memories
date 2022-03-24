import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  creator: String,
  message: String,
  selectedFile: String,
  tags: [String],
  likesCount: {
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
