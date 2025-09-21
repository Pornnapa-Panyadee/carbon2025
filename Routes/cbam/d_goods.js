const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { create, update, readperId, deleteById, readperIdreport, deleteByIdreport } = require('../../Controllers/cbam/d_goods');

// Province
router.post('/d_goods', authenticateToken, create);
router.put('/d_goods/:id', authenticateToken, update);
router.get('/d_goods/:id', authenticateToken, readperId);
router.delete('/d_goods/:id', authenticateToken, deleteById);

router.get('/d_goods/report/:id', authenticateToken, readperIdreport);
router.delete('/d_goods/report/:id', authenticateToken, deleteByIdreport);



module.exports = router; // Export the router