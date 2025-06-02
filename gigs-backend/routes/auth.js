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
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        const user = results[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials!' });
        }

    });
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

module.exports = router;
