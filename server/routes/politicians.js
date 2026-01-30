const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all politicians
router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        
        let query = 'SELECT * FROM politicians';
        let params = [];
        
        if (name) {
            query += ' WHERE name = ?';
            params.push(name);
        }
        
        query += ' ORDER BY name';
        
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching politicians:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// GET politician by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            'SELECT * FROM politicians WHERE id = ?',
            [id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Politician not found' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;