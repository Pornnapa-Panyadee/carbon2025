const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { read, list, create, update, remove } = require('../Controllers/industry');

router.post('/industry', create, authenticateToken);
router.get('/industry', list, authenticateToken);
router.get('/industry/:industrial_id', read, authenticateToken);
router.put('/industry/:industrial_id', update, authenticateToken);
router.delete('/industry/:industrial_id', remove, authenticateToken);



module.exports = router; // Export the router