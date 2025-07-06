const express = require('express');
const router = express.Router(); // Use router instead of app

// const { read_item, create_item } = require('../Controllers/form4_1');
const { read, create, update, remove, list,
    listselfcollect, listSelfCollectId, deleteSelfCollect,
    createProcessSC, readProcessSCByID, updateProcessSCByID, deleteProcessSCByID,
    createItemSC, readItemSCByID, updateItemSCByID, deleteItemSCByID,
    ListItemSCByProcess
} = require('../Controllers/form_self_collect');


router.post('/selfcollect/', create);
router.get('/selfcollect/:id', read);
router.put('/selfcollect/:id', update);
router.delete('/selfcollect/:id', remove);

router.get('/selfcollect/product/:company_id/:product_id', list);

router.get('/selfcollect/list/:company_id', listselfcollect);

// get list of name self collection data
router.get('/selfcollect/list/:company_id/:self_collect_id', listSelfCollectId);
router.delete('/selfcollect/list/:company_id/:self_collect_id', deleteSelfCollect);

// Follow Process and input output data
router.post('/selfcollect/process', createProcessSC);
router.get('/selfcollect/process/:id', readProcessSCByID);
router.put('/selfcollect/process/:id', updateProcessSCByID);
router.delete('/selfcollect/process/:id', deleteProcessSCByID);

router.post('/selfcollect/process/item', createItemSC);
router.get('/selfcollect/process/item/:id', readItemSCByID);
router.put('/selfcollect/process/item/:id', updateItemSCByID);
router.delete('/selfcollect/process/item/:id', deleteItemSCByID);

router.get('/selfcollect/process/list/:company_id/:id', ListItemSCByProcess);

module.exports = router; // Export the router
