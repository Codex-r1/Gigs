// server.js or app.js
require('dotenv').config();
const pool = require('./config/database');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected!');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
})();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
const applicantRoutes = require('./routes/applicants');
app.use('/api/applicants', applicantRoutes);
const employerRoutes = require('./routes/employer');
app.use('/api/employer', employerRoutes); 

app.listen(5000, () => console.log('Server running on port 5000'));
