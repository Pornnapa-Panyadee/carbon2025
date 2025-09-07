const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { read, list, create, update, remove, readbyproduct } = require('../Controllers/process');

router.post('/process', create, authenticateToken);
router.get('/process', list, authenticateToken);
router.get('/process/:id', read, authenticateToken);
router.put('/process/:id', update, authenticateToken);
router.delete('/process/:id', remove, authenticateToken);
router.get('/product/process/:id', readbyproduct, authenticateToken);




module.exports = router; // Export the router