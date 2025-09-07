const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');

const { create, update, readperId, deleteById, readperIddetail } = require('../../Controllers/cbam/verifier');

// Province
router.post('/verifier', create, authenticateToken);
router.put('/verifier/:id', update, authenticateToken);
router.get('/verifier/:id', readperId, authenticateToken);
router.delete('/verifier/:id', deleteById, authenticateToken);
router.get('/verifier/detail/:id', readperIddetail, authenticateToken);



module.exports = router; // Export the router