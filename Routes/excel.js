const express = require('express');
const router = express.Router();
const { getExcel } = require('../Controllers/excel');


router.get('/excel/:company_name/:product_id', getExcel);

module.exports = router;
