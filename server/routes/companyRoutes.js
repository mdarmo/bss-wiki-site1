const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Route to get all companies
router.get('/companies', companyController.getAllCompanies);

// Route to get a specific company by ID
router.get('/companies/:id', companyController.getCompanyById);

module.exports = router;