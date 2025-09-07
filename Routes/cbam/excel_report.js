const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/auth');
const { getExcelReportWithValues } = require('../../Controllers/cbam/excel_report');

// ตัวอย่าง path: /api/excelreport/58/A_InstData
router.get('/excelreport/:sheet/:id', authenticateToken, getExcelReportWithValues);

module.exports = router;