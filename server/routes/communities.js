const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all communities
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                c.*,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'politician', p.name,
                        'party', p.party,
                        'politician_id', p.id
                    )
                ) as major_politicians_with_ids
            FROM communities c
            LEFT JOIN community_politicians cp ON c.id = cp.community_id
            LEFT JOIN politicians p ON cp.politician_id = p.id
            GROUP BY c.id
            ORDER BY c.name
        `);
        
        // Merge the politician data with existing major_politicians field
        const communitiesWithData = rows.map(community => ({
            ...community,
            major_politicians: community.major_politicians_with_ids || community.major_politicians
        }));
        
        res.json(communitiesWithData);
    } catch (err) {
        console.error('Error fetching communities:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// GET community by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(`
            SELECT 
                c.*,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'politician', p.name,
                        'party', p.party,
                        'politician_id', p.id
                    )
                ) as major_politicians_with_ids
            FROM communities c
            LEFT JOIN community_politicians cp ON c.id = cp.community_id
            LEFT JOIN politicians p ON cp.politician_id = p.id
            WHERE c.id = ?
            GROUP BY c.id
        `, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Community not found' });
        }
        
        const community = {
            ...rows[0],
            major_politicians: rows[0].major_politicians_with_ids || rows[0].major_politicians
        };
        
        res.json(community);
    } catch (err) {
        console.error('Error fetching community:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

module.exports = router;