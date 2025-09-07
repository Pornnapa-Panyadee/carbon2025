const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');

const { read, list, create, update, remove, readProcess, listProcess, createProcess, updateProcess, removeProcess } = require('../Controllers/output');

router.post('/output/category', create, authenticateToken);
router.get('/output/category', list, authenticateToken);
router.get('/output/category/:id', read, authenticateToken);
router.put('/output/category/:id', update, authenticateToken);
router.delete('/output/category/:id', remove, authenticateToken);

router.post('/output/process', createProcess, authenticateToken);
router.get('/output/process', listProcess, authenticateToken);
router.get('/output/process/:id', readProcess, authenticateToken);
router.put('/output/process/:id', updateProcess, authenticateToken);
router.delete('/output/process/:id', removeProcess, authenticateToken);



module.exports = router; // Export the router