const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');

const { read, list, create, update, remove } = require('../Controllers/company');

router.post('/company', authenticateToken, create);
router.get('/company', authenticateToken, list);
router.get('/company/:id', authenticateToken, read);
router.put('/company/:id', authenticateToken, update);
router.delete('/company/:id', authenticateToken, remove);



module.exports = router; // Export the router