const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
// const { read_item, create_item } = require('../Controllers/form4_1');
const { read, read1, readall } = require('../Controllers/form1');
// const { read2 } = require('../Controllers/form2');




router.get('/f1/:company_id/:product_id', read, authenticateToken);

router.get('/f1/excel/:company_id/:product_id', read1, authenticateToken);

router.get('/product/all/:company_id/:product_id', readall, authenticateToken);
// router.get('/f2/:company_id/:product_id', read2);
// router.get('/f1/:company_id/:product_id', read);

module.exports = router; // Export the router