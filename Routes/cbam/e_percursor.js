const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperId, readperIdreport, deleteById, deleteByIdreport } = require('../../Controllers/cbam/e_precursors');

// Province
router.post('/e_precursors', create);
router.put('/e_precursors/:id', update);
router.get('/e_precursors/:id', readperId);
router.delete('/e_precursors/:id', deleteById);

router.get('/e_precursors/report/:id', readperIdreport);
router.delete('/e_precursors/report/:id', deleteByIdreport);



module.exports = router; // Export the router