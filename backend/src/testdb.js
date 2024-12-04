// test-database.js
const db = require('./config/database');

async function runDatabaseTest() {
    try {
        const time = await db.query('SELECT NOW()');
        console.log('Database time:', time);
    } catch (error) {
        console.error('Error occurred while connecting to the database:', error);
    } finally {
        db.pool.end();
        console.log('Database connection closed.');
    }
}

runDatabaseTest();
