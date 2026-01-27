const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Update CORS configuration - disable credentials to fix cookie issues
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: false, // Changed from true to false - this fixes the cookie error
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Set security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.use(express.json());

// Import routes
const companiesRoutes = require('./routes/companies');
const communitiesRoutes = require('./routes/communities');
const politiciansRoutes = require('./routes/politicians');
const peopleRoutes = require('./routes/people');

// Routes
app.use('/api/companies', companiesRoutes);
app.use('/api/communities', communitiesRoutes);
app.use('/api/politicians', politiciansRoutes);
app.use('/api/people', peopleRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS origin: ${process.env.FRONTEND_URL || '*'}`);
});