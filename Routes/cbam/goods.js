const express = require('express');
const router = express.Router(); // Use router instead of app

const { list, listAll, listByName, listByRoutes, listByRelevantPrecursors } = require('../../Controllers/cbam/goods');

// Province
router.get('/industry_types', list);
router.get('/goods', listAll);
router.get('/goods/:id', listByName);
router.get('/goods/routes/:id', listByRoutes);
router.get('/goods/relevant/:id', listByRelevantPrecursors);



module.exports = router; // Export the routers