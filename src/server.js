// src/server.js
import express from 'express';
import userRoute from './routes/userRoute.js'; // ✅ not './src/routes/...'

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});