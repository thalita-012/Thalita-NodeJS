import express from 'express';
import userRouter from './routes/userRoute.js';  // Note: no ../ since we're in src folder

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});