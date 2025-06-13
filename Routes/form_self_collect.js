const express = require('express');
const router = express.Router(); // Use router instead of app

// const { read_item, create_item } = require('../Controllers/form4_1');
const { read, create, update, remove, list } = require('../Controllers/form_self_collect');


router.post('/selfcollect/', create);
router.get('/selfcollect/:id', read);
router.put('/selfcollect/:id', update);
router.delete('/selfcollect/:id', remove);

router.get('/selfcollect/product/:company_id/:product_id', list);


module.exports = router; // Export the router
