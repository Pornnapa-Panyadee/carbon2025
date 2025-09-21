const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { create, update, readperId, readperIdreport, deleteById, deleteByIdreport } = require('../../Controllers/cbam/b_emission');

// Province
router.post('/b_emission', authenticateToken, create);
router.put('/b_emission/:id', authenticateToken, update);
router.get('/b_emission/:id', authenticateToken, readperId);
router.delete('/b_emission/:id', authenticateToken, deleteById);

router.get('/b_emission/report/:id', authenticateToken, readperIdreport);
router.delete('/b_emission/report/:id', authenticateToken, deleteByIdreport);



module.exports = router; // Export the router