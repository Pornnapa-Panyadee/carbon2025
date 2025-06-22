const express = require('express');
const router = express.Router(); // Use router instead of app

const { readperIdreport, getExcelReportWithValues } = require('../../Controllers/cbam/excel_repot');

// Province

router.get('/excelreport/:id', readperIdreport);

router.get('/excelrep/:id', getExcelReportWithValues);



module.exports = router; // Export the router


