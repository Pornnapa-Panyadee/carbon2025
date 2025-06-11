const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove, readProcess, listProcess, createProcess, updateProcess, removeProcess } = require('../Controllers/waste');

router.post('/waste/category', create);
router.get('/waste/category', list);
router.get('/waste/category/:id', read);
router.put('/waste/category/:id', update);
router.delete('/waste/category/:id', remove);

router.post('/waste/process', createProcess);
router.get('/waste/process', listProcess);
router.get('/waste/process/:id', readProcess);
router.put('/waste/process/:id', updateProcess);
router.delete('/waste/process/:id', removeProcess);



module.exports = router; // Export the router