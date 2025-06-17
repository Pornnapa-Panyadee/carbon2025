const express = require('express');
const router = express.Router(); // Use router instead of app

const { list } = require('../../Controllers/cbam/countries');

// Province
router.get('/countries', list);


module.exports = router; // Export the router