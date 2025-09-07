const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { create, update, readperId, readperIdreport, deleteById, deleteByIdreport } = require('../../Controllers/cbam/b_emission');

// Province
router.post('/b_emission', create, authenticateToken);
router.put('/b_emission/:id', update, authenticateToken);
router.get('/b_emission/:id', readperId, authenticateToken);
router.delete('/b_emission/:id', deleteById, authenticateToken);

router.get('/b_emission/report/:id', readperIdreport, authenticateToken);
router.delete('/b_emission/report/:id', deleteByIdreport, authenticateToken);



module.exports = router; // Export the router