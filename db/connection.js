const mysql = require('mysql2');


const db = mysql.createConnection({
    host: '127.0.0.1',
    //  MySQL username,
    user: 'root',
    // r MySQL password
    password: '123456789',
    database: 'tracker_db'
});

module.exports = db;
