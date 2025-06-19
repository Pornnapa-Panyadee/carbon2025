const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperId, deleteById, readperIdreport, deleteByIdreport } = require('../../Controllers/cbam/c_emission');

// Province
router.post('/c_emission', create);
router.put('/c_emission/:id', update);
router.get('/c_emission/:id', readperId);
router.delete('/c_emission/:id', deleteById);

router.get('/c_emission/report/:id', readperIdreport);
router.delete('/c_emission/report/:id', deleteByIdreport);



module.exports = router; // Export the router