const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { create, update, readperIDuser, readperID, deleteById, deleteByReportId, readsumaryperId, readDashboardPerId } = require('../../Controllers/cbam/report');

// Province
router.post('/report', authenticateToken, create);
router.put('/report/:id', authenticateToken, update);
router.get('/report/company/:id', authenticateToken, readperIDuser);
router.get('/report/:id', authenticateToken, readperID);
router.delete('/report/:id', authenticateToken, deleteById);


router.delete('/report/del/:id', authenticateToken, deleteByReportId);
router.get('/report/sumary/:id', authenticateToken, readsumaryperId);
router.get('/report/dashboard/:company_id', authenticateToken, readDashboardPerId);



module.exports = router; // Export the router