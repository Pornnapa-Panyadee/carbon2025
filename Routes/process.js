const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove, readbyproduct } = require('../Controllers/process');

router.post('/process', create);
router.get('/process', list);
router.get('/process/:id', read);
router.put('/process/:id', update);
router.delete('/process/:id', remove);
router.get('/product/process/:id', readbyproduct);




module.exports = router; // Export the router