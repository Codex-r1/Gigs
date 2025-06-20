// server.js or app.js
require('dotenv').config();
const pool = require('./config/database');
const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();
const cors = require("cors");
app.use(cors({
  origin: 'http://localhost:3000', // your React frontend
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
app.use('/api/auth', authRoutes);
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/bookmarks', require('./routes/bookmarks'));
const statsRoutes = require('./routes/stats');
app.use('/api/stats', statsRoutes);
const applicantRoutes = require('./routes/applicants');
app.use('/api/applicants', applicantRoutes);
const employerRoutes = require('./routes/employer');
app.use('/api/employer', employerRoutes); 
const employerStatsRoutes = require('./routes/employerStats');
app.use('/api/employerStats', employerStatsRoutes);
app.listen(5000, () => console.log('Server running on port 5000'));
