const express = require('express');
const router = express.Router(); // Use router instead of app

const { read, list, create, update, remove, readAuditorReport,
    createComment, listComments, updateComment, deleteComment, readAuditorProductDetails,
    updateStatusProduct

} = require('../Controllers/auditor');


router.get('/auditor', list);
router.get('/auditor/:auditor_id', read);
router.post('/auditor', create);
router.put('/auditor/:auditor_id', update);
router.delete('/auditor/:auditor_id', remove);

// Report + Dashboard 
router.get('/auditor/report/:auditor_id', readAuditorReport);
// Comment
router.post('/auditor/comment/', createComment);
router.get('/auditor/comment/:comments_id', listComments);
router.put('/auditor/comment/:comments_id', updateComment);
router.delete('/auditor/comment/:comments_id', deleteComment);
// Details per Product
router.get('/auditor/product/:auditor_id/:product_id', readAuditorProductDetails);

// Update status product
router.put('/auditor/product/status/:auditor_id/:product_id/:status_id', updateStatusProduct);


module.exports = router; // Export the router