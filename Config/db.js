// Config/db.js
const mysql = require('mysql2');

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'root',      // Replace with your MySQL user
    password: '',      // Replace with your MySQL password
    database: 'cfp_data' // Replace with your database name
});

// Open the connection to the MySQL database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database:', err.stack);
//         return;
//     }
//     console.log('Connected to MySQL database!');
// });

// Export the connection object itself
module.exports = db;
