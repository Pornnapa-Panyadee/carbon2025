const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperId, deleteById, readperIddetail } = require('../../Controllers/cbam/verifier');

// Province
router.post('/verifier', create);
router.put('/verifier/:id', update);
router.get('/verifier/:id', readperId);
router.delete('/verifier/:id', deleteById);
router.get('/verifier/detail/:id', readperIddetail);



module.exports = router; // Export the router