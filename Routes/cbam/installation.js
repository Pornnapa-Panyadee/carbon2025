const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { create, readAll, update, readperId, deleteById } = require('../../Controllers/cbam/installation');

// Province
router.post('/installation', create, authenticateToken);
router.get('/installation', readAll, authenticateToken);
router.put('/installation/:id', update, authenticateToken);
router.get('/installation/:id', readperId, authenticateToken);

router.delete('/installation/:id', deleteById, authenticateToken);

module.exports = router; // Export the router