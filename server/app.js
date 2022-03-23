import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
