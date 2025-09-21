const express = require('express');
const router = express.Router(); // Use router instead of app
authenticateToken = require('../Middlewares/auth');
const { read, list, create, update, remove, readProcess, listProcess, createProcess, updateProcess, removeProcess } = require('../Controllers/waste');

router.post('/waste/category', create, authenticateToken);
router.get('/waste/category', list, authenticateToken);
router.get('/waste/category/:id', read, authenticateToken);
router.put('/waste/category/:id', update, authenticateToken);
router.delete('/waste/category/:id', remove, authenticateToken);

router.post('/waste/process', createProcess, authenticateToken);
router.get('/waste/process', listProcess, authenticateToken);
router.get('/waste/process/:id', readProcess, authenticateToken);
router.put('/waste/process/:id', updateProcess, authenticateToken);
router.delete('/waste/process/:id', removeProcess, authenticateToken);



module.exports = router; // Export the router