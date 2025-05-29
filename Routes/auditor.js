const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove } = require('../Controllers/auditor');


router.get('/auditor', list);
router.get('/auditor/:auditor_id', read);
router.post('/auditor', create);
router.put('/auditor/:auditor_id', update);
router.delete('/auditor/:auditor_id', remove);



module.exports = router; // Export the router