const express = require('express');
const router = express.Router(); // Use router instead of app

// const { read_item, create_item } = require('../Controllers/form4_1');
const { read } = require('../Controllers/form1');



router.get('/f1/:company_id/:product_id', read);


module.exports = router; // Export the router