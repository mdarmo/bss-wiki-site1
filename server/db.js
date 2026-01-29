const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: 'BSI',
    port: process.env.DB_PORT || 8889,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify for async/await support
const promisePool = pool.promise();

// Test the connection
promisePool.query('SELECT 1')
    .then(() => {
        console.log('✅ Database connection established successfully');
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err.message);
        console.error('Make sure MySQL is running: brew services start mysql');
    });

module.exports = promisePool;