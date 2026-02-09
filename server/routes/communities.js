const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all communities
router.get('/', async (req, res) => {
    try {
        const [communities] = await pool.query(
            `SELECT 
                c.*,
                COALESCE(
                    JSON_ARRAYAGG(
                        IF(p.id IS NOT NULL,
                            JSON_OBJECT(
                                'politician', p.name,
                                'party', p.party,
                                'position_level', p.position_level
                            ),
                            NULL
                        )
                    ),
                    JSON_ARRAY()
                ) as major_politicians
            FROM communities c
            LEFT JOIN community_politicians cp ON c.id = cp.community_id
            LEFT JOIN politicians p ON cp.politician_id = p.id
            GROUP BY c.id
            ORDER BY c.name`
        );

        // Filter out null values from major_politicians arrays
        const cleanedCommunities = communities.map(community => ({
            ...community,
            major_politicians: community.major_politicians ? 
                community.major_politicians.filter(pol => pol !== null) : 
                []
        }));

        res.json(cleanedCommunities);
    } catch (error) {
        console.error('Error fetching communities:', error);
        res.status(500).json({ error: 'Failed to fetch communities' });
    }
});

// GET community by ID
router.get('/:id', async (req, res) => {
    try {
        const [communities] = await pool.query(
            `SELECT 
                c.*,
                COALESCE(
                    JSON_ARRAYAGG(
                        IF(p.id IS NOT NULL,
                            JSON_OBJECT(
                                'politician', p.name,
                                'party', p.party,
                                'position_level', p.position_level
                            ),
                            NULL
                        )
                    ),
                    JSON_ARRAY()
                ) as major_politicians
            FROM communities c
            LEFT JOIN community_politicians cp ON c.id = cp.community_id
            LEFT JOIN politicians p ON cp.politician_id = p.id
            WHERE c.id = ?
            GROUP BY c.id`,
            [req.params.id]
        );

        if (communities.length === 0) {
            return res.status(404).json({ error: 'Community not found' });
        }

        // Filter out null values from major_politicians array
        const community = {
            ...communities[0],
            major_politicians: communities[0].major_politicians ? 
                communities[0].major_politicians.filter(pol => pol !== null) : 
                []
        };

        res.json(community);
    } catch (error) {
        console.error('Error fetching community:', error);
        res.status(500).json({ error: 'Failed to fetch community' });
    }
});

module.exports = router;