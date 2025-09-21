const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { create, update, readperId, readperIdreport, deleteById, deleteByIdreport } = require('../../Controllers/cbam/e_precursors');

// Province
router.post('/e_precursors', authenticateToken, create);
router.put('/e_precursors/:id', authenticateToken, update);
router.get('/e_precursors/:id', authenticateToken, readperId);
router.delete('/e_precursors/:id', authenticateToken, deleteById);

router.get('/e_precursors/report/:id', authenticateToken, readperIdreport);
router.delete('/e_precursors/report/:id', authenticateToken, deleteByIdreport);



module.exports = router; // Export the router