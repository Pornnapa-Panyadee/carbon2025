const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { create, update, readperIDuser, readperID, deleteById, deleteByReportId, readsumaryperId, readDashboardPerId } = require('../../Controllers/cbam/report');

// Province
router.post('/report', create, authenticateToken);
router.put('/report/:id', update, authenticateToken);
router.get('/report/company/:id', readperIDuser, authenticateToken);
router.get('/report/:id', readperID, authenticateToken);
router.delete('/report/:id', deleteById, authenticateToken);


router.delete('/report/del/:id', deleteByReportId, authenticateToken);
router.get('/report/sumary/:id', readsumaryperId, authenticateToken);
router.get('/report/dashboard/:company_id', readDashboardPerId, authenticateToken);



module.exports = router; // Export the router