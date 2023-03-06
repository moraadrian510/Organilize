const mysql = require('mysql2');


const db = mysql.createConnection({
    host: '127.0.0.1',
    //  MySQL username,
    user: 'root',
    // r MySQL password
    password: '',
    database: 'employee_tracker_db'
});

module.exports = db;
