const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root', // Update with your MySQL password if you have one
    database: 'BSI',
    port: 8889, // Explicitly set the port
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