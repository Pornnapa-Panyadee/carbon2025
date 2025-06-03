// Config/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Replace with your MySQL host
    user: process.env.DB_USER,      // Replace with your MySQL user
    password: process.env.DB_PASSWORD,      // Replace with your MySQL password
    database: process.env.DB_DATABASE // Replace with your database name
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
