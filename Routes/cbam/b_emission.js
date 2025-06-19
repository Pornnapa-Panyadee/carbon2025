const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperId, readperIdreport, deleteById, deleteByIdreport } = require('../../Controllers/cbam/b_emission');

// Province
router.post('/b_emission', create);
router.put('/b_emission/:id', update);
router.get('/b_emission/:id', readperId);
router.delete('/b_emission/:id', deleteById);

router.get('/b_emission/report/:id', readperIdreport);
router.delete('/b_emission/report/:id', deleteByIdreport);



module.exports = router; // Export the router