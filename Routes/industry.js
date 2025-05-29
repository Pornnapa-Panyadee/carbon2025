const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove } = require('../Controllers/industry');

router.post('/industry', create);
router.get('/industry', list);
router.get('/industry/:industrial_id', read);
router.put('/industry/:industrial_id', update);
router.delete('/industry/:industrial_id', remove);



module.exports = router; // Export the router