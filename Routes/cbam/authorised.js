const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { create, update, readperId, deleteById } = require('../../Controllers/cbam/authorised');

// Province
router.post('/authorised', create);
router.put('/authorised/:id', update, authenticateToken);
router.get('/authorised/:id', readperId, authenticateToken);
router.delete('/authorised/:id', deleteById, authenticateToken);

module.exports = router; // Export the router