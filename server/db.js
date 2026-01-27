const mysql = require('mysql2');

// Use environment variables for all database credentials
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db-mysql-bsi-wiki-site1-do-user-24566465-0.j.db.ondigitalocean.com',
    user: process.env.DB_USER || 'doadmin',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'BSI',
    port: process.env.DB_PORT || 25060,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: true
    } : false
});

// Promisify for async/await support
const promisePool = pool.promise();

// Test the connection
promisePool.query('SELECT 1')
    .then(() => {
        console.log('✅ Database connection established successfully');
        console.log(`📊 Connected to database: ${process.env.DB_NAME || 'BSI'}`);
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err.message);
        if (process.env.NODE_ENV === 'development') {
            console.error('Make sure MySQL is running: brew services start mysql');
        }
    });

module.exports = promisePool;