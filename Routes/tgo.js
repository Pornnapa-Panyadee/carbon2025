const express = require('express');
const router = express.Router(); // Use router instead of app

const { list, listcat, listsub, listEachsub } = require('../Controllers/tgo');


router.get('/tgo', list);
router.get('/tgo/categories', listcat);
router.get('/tgo/categories/:categories', listsub);
router.get('/tgo/categories/:categories/:subCategory', listEachsub);

module.exports = router; // Export the router