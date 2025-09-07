const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { create, update, readperId, readperIdreport, deleteById, deleteByIdreport } = require('../../Controllers/cbam/e_precursors');

// Province
router.post('/e_precursors', create, authenticateToken);
router.put('/e_precursors/:id', update, authenticateToken);
router.get('/e_precursors/:id', readperId, authenticateToken);
router.delete('/e_precursors/:id', deleteById, authenticateToken);

router.get('/e_precursors/report/:id', readperIdreport, authenticateToken);
router.delete('/e_precursors/report/:id', deleteByIdreport, authenticateToken);



module.exports = router; // Export the router