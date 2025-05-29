const express = require('express');
const router = express.Router(); // Use router instead of app

const { list, listAmp, listTumbon } = require('../Controllers/location');

// Province
router.get('/provinces', list);

// District
router.get('/provinces/:provinceName', listAmp);

// Sub-district
router.get('/provinces/:provinceName/:districtName', listTumbon);



module.exports = router; // Export the router