const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperId, deleteById } = require('../../Controllers/cbam/verifier');

// Province
router.post('/verifier', create);
router.put('/verifier/:id', update);
router.get('/verifier/:id', readperId);
router.delete('/verifier/:id', deleteById);



module.exports = router; // Export the router