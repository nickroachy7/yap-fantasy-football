import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import testNflRouter from './routes/test-nfl';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'YAP Fantasy Football API is running' });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', testNflRouter);

app.listen(PORT, () => {
  console.log(`🏈 Server running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
});
