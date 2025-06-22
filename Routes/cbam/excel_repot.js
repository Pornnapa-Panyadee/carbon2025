const express = require('express');
const router = express.Router(); // Use router instead of app

const { readperIdreport } = require('../../Controllers/cbam/excel_repot');

// Province

router.get('/excelreport/:id', readperIdreport);



module.exports = router; // Export the router