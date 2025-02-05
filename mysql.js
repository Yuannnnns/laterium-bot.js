/// @proj : mysql.js

const mysql = require('mysql2');
const colors = require('colors');

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_NAME,
    connectTimeout: 20000 // @default
});

connection.connect((err) => {
    if (err) {
        console.error('\nError connecting to database:'.red, err.stack);
        return;
    }
    console.log('Connected to database with ID:'.green, connection.threadId);
});

module.exports = connection;
