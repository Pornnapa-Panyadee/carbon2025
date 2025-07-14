const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./Config/db.js');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

(async () => {
    try {
        await db.query('SELECT 1');
        console.log('✅ Database connection is working.');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
})();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Static path for product images
app.use('/product/image/', express.static(path.join(__dirname, 'public/product')));

// Load routes from /Routes (เฉพาะ .js เท่านั้น)
fs.readdirSync('./Routes')
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
        app.use('/api/v1', require(path.join(__dirname, 'Routes', file)));
    });

// Load routes from /Routes/cbam (เฉพาะ .js เท่านั้น)
const cbamPath = path.join(__dirname, 'Routes', 'cbam');
if (fs.existsSync(cbamPath)) {
    fs.readdirSync(cbamPath)
        .filter((file) => file.endsWith('.js'))
        .forEach((file) => {
            app.use('/api/cbam', require(path.join(cbamPath, file)));
        });
}

// Serve static Excel files
app.use('/download', express.static(path.join(__dirname, 'ExcelReport/output')));

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
