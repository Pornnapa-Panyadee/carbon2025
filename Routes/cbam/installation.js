const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, update, readperId, deleteById } = require('../../Controllers/cbam/installation');

// Province
router.post('/installation', create);
router.put('/installation/:id', update);
router.get('/installation/:id', readperId);
router.delete('/installation/:id', deleteById);



module.exports = router; // Export the router