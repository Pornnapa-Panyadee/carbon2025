const express = require('express');
const router = express.Router(); // Use router instead of app

// const { read_item, create_item } = require('../Controllers/form4_1');
const { readperId, create, update, deleteById, readperIdreport, readperIdYear } = require('../Controllers/form6_1');


router.get('/f6-1/sum/:id', readperId);
router.post('/f6-1/sum/', create);
router.put('/f6-1/sum/:id', update);
router.delete('/f6-1/sum/:id', deleteById);
router.get('/f6-1/sum/:id/:year', readperIdYear);

// year based report
router.get('/f6-1/sumform4142/:product_id', readperIdreport);



module.exports = router; // Export the router
