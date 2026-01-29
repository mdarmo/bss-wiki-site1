const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Update CORS configuration - disable credentials to fix cookie issue
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: false, // Changed from true to false
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

// API Routes
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
        environment: process.env.NODE_ENV
    });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the client build directory
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS origin: ${process.env.FRONTEND_URL || '*'}`);
});