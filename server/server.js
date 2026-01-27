const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});