import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
});

const User = mongoose.model('User', userSchema);

export default User;
