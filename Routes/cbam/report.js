const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperIDuser, readperID, deleteById, deleteByReportId } = require('../../Controllers/cbam/report');

// Province
router.post('/report', create);
router.put('/report/:id', update);
router.get('/report/company/:id', readperIDuser);
router.get('/report/:id', readperID);
router.delete('/report/:id', deleteById);


router.delete('/report/del/:id', deleteByReportId);



module.exports = router; // Export the router