const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
const { read, list, create, update, remove } = require('../Controllers/pcr');

router.post('/pcr', create, authenticateToken);
router.get('/pcr', list, authenticateToken);
router.get('/pcr/:id', read, authenticateToken);
router.put('/pcr/:id', update, authenticateToken);
router.delete('/pcr/:id', remove, authenticateToken);




module.exports = router; // Export the router