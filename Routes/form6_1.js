const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
// const { read_item, create_item } = require('../Controllers/form4_1');
const { readperId, create, update, deleteById, readperIdreport, readperIdYear } = require('../Controllers/form6_1');


router.get('/f6-1/sum/:id', readperId, authenticateToken);
router.post('/f6-1/sum/', create, authenticateToken);
router.put('/f6-1/sum/:id', update, authenticateToken);
router.delete('/f6-1/sum/:id', deleteById, authenticateToken);
router.get('/f6-1/sum/:id/:year', readperIdYear, authenticateToken);

// year based report
router.get('/f6-1/sumform4142/:product_id', readperIdreport, authenticateToken);



module.exports = router; // Export the router
