const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { create, update, readperId, deleteById, readperIdreport, deleteByIdreport } = require('../../Controllers/cbam/c_emission');

// Province
router.post('/c_emission', create, authenticateToken);
router.put('/c_emission/:id', update, authenticateToken);
router.get('/c_emission/:id', readperId, authenticateToken);
router.delete('/c_emission/:id', deleteById, authenticateToken);

router.get('/c_emission/report/:id', readperIdreport, authenticateToken);
router.delete('/c_emission/report/:id', deleteByIdreport, authenticateToken);


module.exports = router; // Export the router