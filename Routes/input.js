const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove, readProcess, listProcess, createProcess, updateProcess, removeProcess } = require('../Controllers/input');

router.post('/input/category', create);
router.get('/input/category', list);
router.get('/input/category/:id', read);
router.put('/input/category/:id', update);
router.delete('/input/category/:id', remove);

router.post('/input/process', createProcess);
router.get('/input/process', listProcess);
router.get('/input/process/:id', readProcess);
router.put('/input/process/:id', updateProcess);
router.delete('/input/process/:id', removeProcess);



module.exports = router; // Export the router