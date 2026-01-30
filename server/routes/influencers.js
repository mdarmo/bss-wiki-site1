const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all influencers
router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        
        let query = 'SELECT * FROM influencers';
        let params = [];
        
        if (name) {
            query += ' WHERE name = ?';
            params.push(name);
        }
        
        query += ' ORDER BY name';
        
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching influencers:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// Get influencer by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM influencers WHERE id = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Influencer not found' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching influencer:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// Get influencer by name
router.get('/by-name/:name', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM influencers WHERE name = ?',
            [req.params.name]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Influencer not found' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching influencer:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

module.exports = router;