const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { create, update, readperId, deleteById, readperIddetail } = require('../../Controllers/cbam/verifier');

// Province
router.post('/verifier', authenticateToken, create);
router.put('/verifier/:id', authenticateToken, update);
router.get('/verifier/:id', authenticateToken, readperId);
router.delete('/verifier/:id', authenticateToken, deleteById);
router.get('/verifier/detail/:id', authenticateToken, readperIddetail);



module.exports = router; // Export the router