import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  creator: String,
  creatorId: String,
  message: String,
  selectedFile: String,
  tags: [String],
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [Object],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
