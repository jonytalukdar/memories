import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { connectDb } from './db/connectDb.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

app.use('/api/v1/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};
startServer();
