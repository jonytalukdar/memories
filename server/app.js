import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import postsRoutes from './routes/postsRoutes.js';
import { connectDb } from './db/connectDb.js';

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(morgan('dev'));
app.use(cors());

app.use('/posts', postsRoutes);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
