const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');

const { read, list, create, update, remove, readByCompanyId, listCommentsByProduct } = require('../Controllers/company');

router.post('/company', create);
router.get('/company', authenticateToken, list);
router.get('/company/:id', authenticateToken, read);
router.put('/company/:id', authenticateToken, update);
router.delete('/company/:id', authenticateToken, remove);

router.get('/company/product/:company_id', authenticateToken, readByCompanyId);


// comment Review
router.get('/company/comment/:auditor_id/:company_id/:product_id', authenticateToken, listCommentsByProduct);

module.exports = router; // Export the router