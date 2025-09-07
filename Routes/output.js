const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove, readProcess, listProcess, createProcess, updateProcess, removeProcess } = require('../Controllers/output');

router.post('/output/category', create);
router.get('/output/category', list);
router.get('/output/category/:id', read);
router.put('/output/category/:id', update);
router.delete('/output/category/:id', remove);

router.post('/output/process', createProcess);
router.get('/output/process', listProcess);
router.get('/output/process/:id', readProcess);
router.put('/output/process/:id', updateProcess);
router.delete('/output/process/:id', removeProcess);



module.exports = router; // Export the router