const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { list, listAll, listByName, listByRoutes, listByRelevantPrecursors } = require('../../Controllers/cbam/goods');

// Province
router.get('/industry_types', authenticateToken, list);
router.get('/goods', authenticateToken, listAll);
router.get('/goods/:id', authenticateToken, listByName);
router.get('/goods/routes/:id', authenticateToken, listByRoutes);
router.get('/goods/relevant/:id', authenticateToken, listByRelevantPrecursors);



module.exports = router; // Export the routers