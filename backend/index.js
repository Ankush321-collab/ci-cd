import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello, World!' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  res.json({
    token: 'demo-token',
    user: {
      id: 'user-001',
      name: 'Demo User',
      email,
    },
  });
});

app.post('/api/signup', (req, res) => {
  const { name, email, password, teamSize, acceptTerms } = req.body || {};
  if (!name || !email || !password || !teamSize) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }
  if (!acceptTerms) {
    res.status(400).json({ error: 'You must accept the terms.' });
    return;
  }

  res.status(201).json({
    token: 'demo-token',
    user: {
      id: 'user-002',
      name,
      email,
      teamSize,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});