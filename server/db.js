const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'db-mysql-bsi-wiki-site1-do-user-24566465-0.j.db.ondigitalocean.com',
    user: 'doadmin',
    password: process.env.DB_PASSWORD, // Update with your MySQL password if you have one
    database: 'BSI',
    port: 25060, // Explicitly set the port
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