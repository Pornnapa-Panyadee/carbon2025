const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../Middlewares/auth');

// const { read_item, create_item } = require('../Controllers/form4_1');
const { read, create, update, remove, list,
    listselfcollect, listSelfCollectId, deleteSelfCollect,
    createProcessSC, readProcessSCByID, updateProcessSCByID, deleteProcessSCByID,
    createItemSC, readItemSCByID, updateItemSCByID, deleteItemSCByID,
    ListItemSCByProcess, deleteItemSCByProcess
} = require('../Controllers/form_self_collect');


router.post('/selfcollect/', create, authenticateToken);
router.get('/selfcollect/:id', read, authenticateToken);
router.put('/selfcollect/:id', update, authenticateToken);
router.delete('/selfcollect/:id', remove, authenticateToken);

router.get('/selfcollect/product/:company_id/:product_id', list, authenticateToken);

router.get('/selfcollect/list/:company_id', listselfcollect);

// get list of name self collection data
router.get('/selfcollect/list/:company_id/:product_id', listSelfCollectId, authenticateToken);
router.delete('/selfcollect/list/:company_id/:self_collect_id', deleteSelfCollect, authenticateToken);

// Follow Process and input output data
router.post('/selfcollect/process', createProcessSC, authenticateToken);
router.get('/selfcollect/process/:id', readProcessSCByID, authenticateToken);
router.put('/selfcollect/process/:id', updateProcessSCByID, authenticateToken);
router.delete('/selfcollect/process/:id', deleteProcessSCByID, authenticateToken);

router.post('/selfcollect/process/item', createItemSC, authenticateToken);
router.get('/selfcollect/process/item/:id', readItemSCByID, authenticateToken);
router.put('/selfcollect/process/item/:id', updateItemSCByID, authenticateToken);
router.delete('/selfcollect/process/item/:id', deleteItemSCByID, authenticateToken);

router.get('/selfcollect/process/list/:company_id/:id', ListItemSCByProcess, authenticateToken);

router.delete('/selfcollect/process/list/:company_id/:id', deleteItemSCByProcess, authenticateToken);

module.exports = router; // Export the router
