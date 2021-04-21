// mysql package to connect to db
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port if not 3306
    port: 3306,

    // Your username
    user: 'root',

    //Update password field with your personal password
    password: 'password',
    database: 'employeeTrackerDB'
});

//connection to database
connection.connect((err) => {
    if (err) throw err;
});

// promise for connection query
connection.query = util.promisify(connection.query);

module.exports =  connection;