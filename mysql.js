/// @proj : mysql.js

const mysql = require('mysql2');
const colors = require('colors');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 20000
});

connection.connect((err) => {
    if (err) {
        console.error('\nError connecting to database:'.red, err.stack);
        return;
    }
    console.log('Connected to database with ID:'.green, connection.threadId);
});

module.exports = connection;
