const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { create, readAll, update, readperId, deleteById } = require('../../Controllers/cbam/installation');

// Province
router.post('/installation', authenticateToken, create);
router.get('/installation', authenticateToken, readAll);
router.put('/installation/:id', authenticateToken, update);
router.get('/installation/:id', authenticateToken, readperId);

router.delete('/installation/:id', authenticateToken, deleteById);



module.exports = router; // Export the router