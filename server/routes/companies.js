const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all companies
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM companies ORDER BY company_name');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching companies:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// GET company by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM companies WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching company:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

module.exports = router;