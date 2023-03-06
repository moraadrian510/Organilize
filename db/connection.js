const mysql = require('mysql2');
//require('dotenv').config();

const db = mysql.createConnection({
    host: '127.0.0.1',
    //  MySQL username,
    user: 'root',
    // r MySQL password
    password: 'Mercado510',
    database: 'employee_tracker_db'
});

module.exports = db;
