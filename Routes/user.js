const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove } = require('../Controllers/user');
const authenticateToken = require('../Middlewares/auth');

router.get('/users', authenticateToken, list);
router.get('/users/:user_id', authenticateToken, read);
router.post('/users', authenticateToken, create);
router.put('/users/:user_id', authenticateToken, update);
router.delete('/users/:user_id', authenticateToken, remove);


// router.get('/users', list);
// router.get('/users/:user_id', read);
// router.post('/users', create);
// router.put('/users/:user_id', update);
// router.delete('/users/:user_id', remove);



module.exports = router; // Export the router