const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { create, update, readperId, deleteById, readperIdreport, deleteByIdreport } = require('../../Controllers/cbam/d_goods');

// Province
router.post('/d_goods', create, authenticateToken);
router.put('/d_goods/:id', update, authenticateToken);
router.get('/d_goods/:id', readperId, authenticateToken);
router.delete('/d_goods/:id', deleteById, authenticateToken);

router.get('/d_goods/report/:id', readperIdreport, authenticateToken);
router.delete('/d_goods/report/:id', deleteByIdreport, authenticateToken);



module.exports = router; // Export the router