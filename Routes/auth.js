const express = require('express');
const router = express.Router();
const { login } = require('../Controllers/auth');
const authenticateToken = require('../Middlewares/auth');

router.post('/login', login, authenticateToken);

module.exports = router;