// This file exports functions for handling database queries related to the "company" table, including fetching company data.

const pool = require('../config/database');

// Get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, company_name, legal_name, website, headquarters FROM company ORDER BY company_name'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM company WHERE id = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }
        
        // Parse JSON-like string fields
        const company = rows[0];
        
        if (company.founders && typeof company.founders === 'string') {
            try {
                // Replace single quotes with double quotes for valid JSON
                const foundersJson = company.founders.replace(/'/g, '"');
                company.founders = JSON.parse(foundersJson);
            } catch (e) {
                console.error('Error parsing founders:', e);
                company.founders = [];
            }
        }
        
        if (company.executives && typeof company.executives === 'string') {
            try {
                // Replace single quotes with double quotes for valid JSON
                const executivesJson = company.executives.replace(/'/g, '"');
                company.executives = JSON.parse(executivesJson);
            } catch (e) {
                console.error('Error parsing executives:', e);
                company.executives = [];
            }
        }
        
        res.json(company);
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ error: 'Failed to fetch company' });
    }
};