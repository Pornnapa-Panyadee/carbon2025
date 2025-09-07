const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
// const { read_item, create_item } = require('../Controllers/form4_1');
const { read_item, create_item, update_item, remove_item, read_sum, create_sum, update_sum, remove_sum, read_form, read_formweb, read_f03, readByItem } = require('../Controllers/form4_1');



router.post('/f4-1/item/', create_item, authenticateToken);
router.get('/f4-1/item/:id', read_item, authenticateToken);
router.put('/f4-1/item/:id', update_item, authenticateToken);
router.delete('/f4-1/item/:id', remove_item, authenticateToken);

router.get('/f4-1/sum/:id', read_sum, authenticateToken);
router.post('/f4-1/sum/', create_sum, authenticateToken);
router.put('/f4-1/sum/', update_sum, authenticateToken);
router.delete('/f4-1/sum/:id', remove_sum, authenticateToken);

router.get('/f4-1/reportweb/:id', read_formweb, authenticateToken);
router.get('/f4-1/report/:id', read_form, authenticateToken);
router.get('/f4-1/form/:company_id/:product_id', read_f03, authenticateToken);

router.get('/f4-1/:life_cycle_phase/:company_id/:product_id/:class/:item_id', readByItem, authenticateToken);



module.exports = router; // Export the router