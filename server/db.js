const mysql = require('mysql2');
const fs = require('fs');

// SSL configuration for DigitalOcean managed database
const sslConfig = process.env.NODE_ENV === 'production' ? {
    ca: process.env.DB_CA_CERT || fs.readFileSync('/server/config/ca-certificate.crt', 'utf-8'),
    rejectUnauthorized: false // Set to false to accept self-signed certificates
} : false;

// Use environment variables for all database credentials
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'BSI',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000,
    ssl: sslConfig
});

// Promisify for async/await support
const promisePool = pool.promise();

// Test the connection
promisePool.query('SELECT 1')
    .then(() => {
        console.log('✅ Database connection established successfully');
        console.log(`📊 Connected to database: ${process.env.DB_NAME || 'BSI'}`);
        console.log(`🔒 SSL: ${process.env.NODE_ENV === 'production' ? 'enabled' : 'disabled'}`);
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err.message);
        console.error('Full error:', err);
        if (process.env.NODE_ENV === 'development') {
            console.error('Make sure MySQL is running: brew services start mysql');
        } else {
            console.error('Check database environment variables and SSL configuration');
        }
    });

module.exports = promisePool;