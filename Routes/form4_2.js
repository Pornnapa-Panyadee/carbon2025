const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
// const { read_item, create_item } = require('../Controllers/form4_1');
const { read_item, create_item, update_item, remove_item, read_sum, create_sum, update_sum, remove_sum, read_form, readByItem } = require('../Controllers/form4_2');



router.post('/f4-2/item/', create_item, authenticateToken);
router.get('/f4-2/item/:id', read_item, authenticateToken);
router.put('/f4-2/item/:id', update_item, authenticateToken);
router.delete('/f4-2/item/:id', remove_item, authenticateToken);

router.get('/f4-2/sum/:id', read_sum, authenticateToken);
router.post('/f4-2/sum/', create_sum, authenticateToken);
router.put('/f4-2/sum/', update_sum, authenticateToken);
router.delete('/f4-2/sum/:id', remove_sum, authenticateToken);

router.get('/f4-2/form/:id', read_form, authenticateToken);


router.get('/f4-2/:life_cycle_phase/:company_id/:product_id/:class/:item_id', readByItem, authenticateToken);



module.exports = router; // Export the router
