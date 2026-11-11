require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { speedInsightsMiddleware } = require('./speed-insights');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Speed Insights middleware for route tracking
app.use(speedInsightsMiddleware);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// API info endpoint (JSON response for programmatic access)
app.get('/api', (req, res) => {
  res.json({
    message: 'LiteraBook Store API is running',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      books: '/books',
      categories: '/categories',
      users: '/users',
      orders: '/orders'
    }
  });
});

// Root endpoint - serve HTML landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Books endpoints (placeholder structure based on README)
app.get('/books', (req, res) => {
  res.json({ message: 'Get all books endpoint' });
});

app.get('/books/:id', (req, res) => {
  res.json({ message: `Get book ${req.params.id} endpoint` });
});

app.post('/books', (req, res) => {
  res.status(201).json({ message: 'Create book endpoint' });
});

app.put('/books/:id', (req, res) => {
  res.json({ message: `Update book ${req.params.id} endpoint` });
});

app.patch('/books/:id', (req, res) => {
  res.json({ message: `Patch book ${req.params.id} endpoint` });
});

app.delete('/books/:id', (req, res) => {
  res.json({ message: `Delete book ${req.params.id} endpoint` });
});

// Categories endpoints (placeholder)
app.get('/categories', (req, res) => {
  res.json({ message: 'Get all categories endpoint' });
});

app.post('/categories', (req, res) => {
  res.status(201).json({ message: 'Create category endpoint' });
});

// Users endpoints (placeholder)
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users endpoint' });
});

app.post('/users', (req, res) => {
  res.status(201).json({ message: 'Create user endpoint' });
});

// Orders endpoints (placeholder)
app.get('/orders', (req, res) => {
  res.json({ message: 'Get all orders endpoint' });
});

app.post('/orders', (req, res) => {
  res.status(201).json({ message: 'Create order endpoint' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Terjadi kesalahan server' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LiteraBook Store API running on port ${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}/`);
});

module.exports = app;
