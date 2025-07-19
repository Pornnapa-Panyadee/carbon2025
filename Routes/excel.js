const express = require('express');
const router = express.Router();
const { getExcel, getExcelByCompany, loadExcelByCompany, getExcelByAuditor } = require('../Controllers/excel');


router.get('/excel/:company_name/:product_id', getExcel);
// company
router.get('/excel/company/:company_id/:product_id', getExcelByCompany);
// Auditor
router.get('/excel/auditor/:auditor_id/:product_id', getExcelByAuditor);

//Download 
router.get('/download/excel/:company_id/:product_id', loadExcelByCompany);

module.exports = router;
