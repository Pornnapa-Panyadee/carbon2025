const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove, readAuditorReport,
    createComment, listComments, updateComment, deleteComment, readAuditorProductDetails,
    updateStatusProduct, getIdUser

} = require('../Controllers/auditor');
const authenticateToken = require('../Middlewares/auth');

router.get('/auditor', list, authenticateToken);
router.get('/auditor/:auditor_id', read, authenticateToken);
router.post('/auditor', create, authenticateToken);
router.put('/auditor/:auditor_id', update, authenticateToken);
router.delete('/auditor/:auditor_id', remove, authenticateToken);

// Report + Dashboard
router.get('/auditor/report/:auditor_id', readAuditorReport, authenticateToken);
// Comment
router.post('/auditor/comment/', createComment, authenticateToken);
router.get('/auditor/comment/:comments_id', listComments, authenticateToken);
router.put('/auditor/comment/:comments_id', updateComment, authenticateToken);
router.delete('/auditor/comment/:comments_id', deleteComment, authenticateToken);
// Details per Product
router.get('/auditor/product/:auditor_id/:product_id', readAuditorProductDetails, authenticateToken);

// Update status product
router.put('/auditor/product/status/:auditor_id/:product_id/:status_id', updateStatusProduct, authenticateToken);


// Export the router
router.get('/auditor/user/:user_id', getIdUser, authenticateToken);


module.exports = router; // Export the router