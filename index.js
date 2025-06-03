const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./Config/db.js');
const path = require('path');

const { readdirSync } = require('fs');

const app = express();
const port = 5000;
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});
// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// readdirSync('./Routes').map((r) => app.use('/api/v1', require('./Routes/' + r)));
readdirSync('./Routes').map((r) => app.use('/api/v1', require('./Routes/' + r)));

// เสิร์ฟ static file Excel
app.use('/download', express.static(path.join(__dirname, 'ExcelReport/excel')));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
