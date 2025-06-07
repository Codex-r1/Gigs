const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const db = require('../config/database');
require('dotenv').config();


// Register Route
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const sql = 'INSERT INTO Users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?)';

        db.query(sql, [firstName, lastName, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Registration error:', err.message);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Login Route
// routes/auth.js (or directly in server.js)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Please provide email and password.');
    }

    try {
        const [rows] = await pool.execute('SELECT userId, email, password, role FROM Users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).send('Invalid credentials.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials.');
        }

        // Authentication successful!
        // Store essential user info in the session
        req.session.user = {
            userId: user.userId,
            email: user.email,
            role: user.role
        };

        // Redirect based on role
        switch (user.role) {
            case 'mentor':
                return res.redirect('/mentor/dashboard');
            case 'youth':
                return res.redirect('/youth/home');
            case 'admin':
                return res.redirect('/admin/dashboard');
            default:
                // Fallback for unexpected roles
                return res.redirect('/dashboard');
        }

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('An error occurred during login.');
    }
});

// Profile Route
router.get('/profile', (req, res) => {
    const sql = 'SELECT firstName, lastName, email FROM Users WHERE userId = ?';
    db.query(sql, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!results[0]) return res.status(404).json({ error: 'User not found' });
        res.json(results[0]);
    });
});


// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/login'); // Redirect to login page after logout
    });
});
module.exports = router;
