const express = require('express');
const router = express.Router(); // Use router instead of app

const { list, listcat, listsub, listEachsub } = require('../Controllers/tgo');


router.get('/tgo', list);
router.get('/tgo/categories', listcat);
router.get('/tgo/categories/:tgo_ef_cat_id', listsub);
router.get('/tgo/categories/:tgo_ef_cat_id/:tgo_ef_subcat_id', listEachsub);

module.exports = router; // Export the router