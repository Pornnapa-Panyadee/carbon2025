const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperId, deleteById } = require('../../Controllers/cbam/authorised');

// Province
router.post('/authorised', create);
router.put('/authorised/:id', update);
router.get('/authorised/:id', readperId);
router.delete('/authorised/:id', deleteById);

module.exports = router; // Export the router