const express = require('express');
const router = express.Router(); // Use router instead of app

const { list, listAmp, listTumbon } = require('../Controllers/location');
const authenticateToken = require('../Middlewares/auth');

// Province
router.get('/provinces', list, authenticateToken);

// District
router.get('/provinces/:provinceName', listAmp, authenticateToken);

// Sub-district
router.get('/provinces/:provinceName/:districtName', listTumbon, authenticateToken);



module.exports = router; // Export the router