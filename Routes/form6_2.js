const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');
// const { read_item, create_item } = require('../Controllers/form4_1');
const { readperId, create, update, deleteById } = require('../Controllers/form6_2');


router.get('/f6-2/sum/:id', readperId, authenticateToken);
router.post('/f6-2/sum/', create, authenticateToken);
router.put('/f6-2/sum/:id', update, authenticateToken);
router.delete('/f6-2/sum/:id', deleteById, authenticateToken);





module.exports = router; // Export the router
