const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { list } = require('../../Controllers/cbam/countries');

// Province
router.get('/countries', authenticateToken, list);


module.exports = router; // Export the router