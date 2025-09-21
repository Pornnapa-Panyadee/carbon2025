const express = require('express');
const router = express.Router();
const { getExcelPDF, getExcel, getExcelByCompany, loadExcelByCompany, getExcelByAuditor, loadExcelByAuditor } = require('../Controllers/excel');
const authenticateToken = require('../Middlewares/auth');

// Company
router.get('/excel/company/:company_id/:product_id', getExcelByCompany, authenticateToken);

// Auditor
router.get('/excel/auditor/:auditor_id/:product_id', getExcelByAuditor, authenticateToken);

// PDF (มี sheet)
router.get('/excel/:sheet/:company_name/:product_id', getExcelPDF, authenticateToken);

// Legacy / generic
router.get('/excel/:company_name/:product_id', getExcel, authenticateToken);

// Download
router.get('/download/excel/company/:company_id/:product_id', loadExcelByCompany, authenticateToken);
router.get('/download/excel/auditor/:auditor_id/:product_id', loadExcelByAuditor, authenticateToken);



module.exports = router;
