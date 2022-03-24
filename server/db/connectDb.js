import mongoose from 'mongoose';

export const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};
