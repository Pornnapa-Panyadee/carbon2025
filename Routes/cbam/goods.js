const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { list, listAll, listByName, listByRoutes, listByRelevantPrecursors } = require('../../Controllers/cbam/goods');

// Province
router.get('/industry_types', list, authenticateToken);
router.get('/goods', listAll, authenticateToken);
router.get('/goods/:id', listByName, authenticateToken);
router.get('/goods/routes/:id', listByRoutes, authenticateToken);
router.get('/goods/relevant/:id', listByRelevantPrecursors, authenticateToken);



module.exports = router; // Export the routers