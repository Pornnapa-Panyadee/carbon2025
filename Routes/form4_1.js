const express = require('express');
const router = express.Router(); // Use router instead of app

// const { read_item, create_item } = require('../Controllers/form4_1');
const { read_item, create_item, update_item, remove_item, read_sum, create_sum, update_sum, remove_sum, read_form, read_formweb, read_f03, readByItem } = require('../Controllers/form4_1');



router.post('/f4-1/item/', create_item);
router.get('/f4-1/item/:id', read_item);
router.put('/f4-1/item/:id', update_item);
router.delete('/f4-1/item/:id', remove_item);

router.get('/f4-1/sum/:id', read_sum);
router.post('/f4-1/sum/', create_sum);
router.put('/f4-1/sum/', update_sum);
router.delete('/f4-1/sum/:id', remove_sum);

router.get('/f4-1/reportweb/:id', read_formweb);
router.get('/f4-1/report/:id', read_form);
router.get('/f4-1/form/:company_id/:product_id', read_f03);

router.get('/f4-1/:life_cycle_phase/:company_id/:product_id/:class/:item_id', readByItem);



module.exports = router; // Export the router