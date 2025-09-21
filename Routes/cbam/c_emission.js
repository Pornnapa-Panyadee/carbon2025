const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { create, update, readperId, deleteById, readperIdreport, deleteByIdreport } = require('../../Controllers/cbam/c_emission');

// Province
router.post('/c_emission', authenticateToken, create);
router.put('/c_emission/:id', authenticateToken, update);
router.get('/c_emission/:id', authenticateToken, readperId);
router.delete('/c_emission/:id', authenticateToken, deleteById);

router.get('/c_emission/report/:id', authenticateToken, readperIdreport);
router.delete('/c_emission/report/:id', authenticateToken, deleteByIdreport);



module.exports = router; // Export the router