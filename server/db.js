const mysql = require('mysql2');

// Use environment variables for all database credentials
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'BSI',
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false // Accept self-signed certificates
    } : false
});

// Promisify for async/await support
const promisePool = pool.promise();

// Test the connection with retry logic
let retries = 3;
const testConnection = async () => {
    try {
        await promisePool.query('SELECT 1');
        console.log('✅ Database connection established successfully');
        console.log(`📊 Connected to: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
        console.log(`🗄️  Database: ${process.env.DB_NAME || 'BSI'}`);
        console.log(`🔒 SSL: ${process.env.NODE_ENV === 'production' ? 'enabled' : 'disabled'}`);
    } catch (err) {
        console.error(`❌ Database connection failed (attempt ${4 - retries}/3):`, err.message);
        
        if (retries > 1) {
            retries--;
            console.log(`⏳ Retrying in 5 seconds...`);
            setTimeout(testConnection, 5000);
        } else {
            console.error('❌ All connection attempts failed');
            console.error('Database config:', {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
                ssl: process.env.NODE_ENV === 'production'
            });
        }
    }
};

testConnection();

module.exports = promisePool;