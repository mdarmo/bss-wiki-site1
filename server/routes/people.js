const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET person by name
router.get('/name/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const [rows] = await pool.query(
            `SELECT p.*, c.company_name 
             FROM people p 
             LEFT JOIN companies c ON p.company_id = c.id 
             WHERE p.name = ?`,
            [name]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Person not found' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching person:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// GET person by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT p.*, c.company_name 
             FROM people p 
             LEFT JOIN companies c ON p.company_id = c.id 
             WHERE p.id = ?`,
            [id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Person not found' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching person:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// GET all people
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT p.*, c.company_name 
             FROM people p 
             LEFT JOIN companies c ON p.company_id = c.id 
             ORDER BY p.name`
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching people:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

module.exports = router;