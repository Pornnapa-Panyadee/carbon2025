const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove, readProcess, listProcess, createProcess, updateProcess, removeProcess } = require('../Controllers/input');
authenticateToken = require('../Middlewares/auth');
router.post('/input/category', create, authenticateToken);
router.get('/input/category', list, authenticateToken);
router.get('/input/category/:id', read, authenticateToken);
router.put('/input/category/:id', update, authenticateToken);
router.delete('/input/category/:id', remove, authenticateToken);

router.post('/input/process', createProcess, authenticateToken);
router.get('/input/process', listProcess, authenticateToken);
router.get('/input/process/:id', readProcess, authenticateToken);
router.put('/input/process/:id', updateProcess, authenticateToken);
router.delete('/input/process/:id', removeProcess, authenticateToken);



module.exports = router; // Export the router