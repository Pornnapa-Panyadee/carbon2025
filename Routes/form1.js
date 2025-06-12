const express = require('express');
const router = express.Router(); // Use router instead of app

// const { read_item, create_item } = require('../Controllers/form4_1');
const { read, read1, readall } = require('../Controllers/form1');
// const { read2 } = require('../Controllers/form2');



router.get('/f1/:company_id/:product_id', read);

router.get('/f1/excel/:company_id/:product_id', read1);

router.get('/product/all/:company_id/:product_id', readall);
// router.get('/f2/:company_id/:product_id', read2);
// router.get('/f1/:company_id/:product_id', read);

module.exports = router; // Export the router