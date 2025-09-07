const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperId, deleteById, readperIdreport, deleteByIdreport } = require('../../Controllers/cbam/d_goods');

// Province
router.post('/d_goods', create);
router.put('/d_goods/:id', update);
router.get('/d_goods/:id', readperId);
router.delete('/d_goods/:id', deleteById);

router.get('/d_goods/report/:id', readperIdreport);
router.delete('/d_goods/report/:id', deleteByIdreport);



module.exports = router; // Export the router