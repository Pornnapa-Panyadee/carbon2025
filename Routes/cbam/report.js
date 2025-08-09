const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperIDuser, readperID, deleteById, deleteByReportId, readsumaryperId } = require('../../Controllers/cbam/report');

// Province
router.post('/report', create);
router.put('/report/:id', update);
router.get('/report/company/:id', readperIDuser);
router.get('/report/:id', readperID);
router.delete('/report/:id', deleteById);


router.delete('/report/del/:id', deleteByReportId);
router.get('/report/sumary/:id', readsumaryperId);



module.exports = router; // Export the router