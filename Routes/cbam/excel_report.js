const express = require('express');
const router = express.Router();

const { getExcelReportWithValues } = require('../../Controllers/cbam/excel_report');

// ตัวอย่าง path: /api/excelreport/58/A_InstData
router.get('/excelreport/:sheet/:id', getExcelReportWithValues);

module.exports = router;