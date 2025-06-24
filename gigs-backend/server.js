// server.js
require('dotenv').config({ path: __dirname + '/.env' }); // 

const pool = require('./config/database');
const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:3000', // React frontend
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// DB connection test
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected!');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
})();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/bookmarks', require('./routes/bookmarks'));
app.use('/api/ratings', require('./routes/ratings'));
app.use('/api/auth/profile', require('./routes/profile'));
app.use('/api/stats', require('./routes/stats'));
const applicationsRoutes = require('./routes/applications');
app.use('/api/applications', applicationsRoutes);
const employerRoutes = require('./routes/employer');
app.use('/api/employer', employerRoutes);

app.use('api/bookmarks', require('./routes/bookmarks'));
// Employer stats route
app.use('/api/employerStats', require('./routes/employerStats'));

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
