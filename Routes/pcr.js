const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove } = require('../Controllers/pcr');

router.post('/pcr', create);
router.get('/pcr', list);
router.get('/pcr/:id', read);
router.put('/pcr/:id', update);
router.delete('pcr/:id', remove);




module.exports = router; // Export the router