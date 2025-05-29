const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove } = require('../Controllers/company');

router.post('/company', create);
router.get('/company', list);
router.get('/company/:id', read);
router.put('/company/:id', update);
router.delete('/company/:id', remove);



module.exports = router; // Export the router