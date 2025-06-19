const express = require('express');
const router = express.Router(); // Use router instead of app

const { create, readAll, update, readperId, deleteById } = require('../../Controllers/cbam/installation');

// Province
router.post('/installation', create);
router.get('/installation', readAll);
router.put('/installation/:id', update);
router.get('/installation/:id', readperId);

router.delete('/installation/:id', deleteById);



module.exports = router; // Export the router