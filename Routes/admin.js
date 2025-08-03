const express = require('express');
const router = express.Router();
const { listDashboard, listRound, createRound, listRoundId, updateRoundId, deleteRoundId,
    listUnit, createUnit, listUnitId, updateUnitId, deleteUnitId,
    listPCR, createPCR, listPCRId, updatePCRId, deletePCRId,
    listIndustrial, createIndustrial, listIndustrialId, updateIndustrialId, deleteIndustrialId,
    listTGOef, createTGOef, listTGOefId, updateTGOefId, deleteTGOefId, listTGOefCategories, listTGOefSubCategories

} = require('../Controllers/admin');

// Dashboard
router.get('/admin/dashboard', listDashboard);

// Information
// -- Round --
router.get('/admin/rounds', listRound);
router.post('/admin/rounds', createRound);
router.get('/admin/rounds/:id', listRoundId);
router.put('/admin/rounds/:id', updateRoundId);
router.delete('/admin/rounds/:id', deleteRoundId);

// -- Unit --
router.get('/admin/units', listUnit);
router.post('/admin/units', createUnit);
router.get('/admin/units/:id', listUnitId);
router.put('/admin/units/:id', updateUnitId);
router.delete('/admin/units/:id', deleteUnitId);

// -- PCR --
router.get('/admin/pcrs', listPCR);
router.post('/admin/pcrs', createPCR);
router.get('/admin/pcrs/:id', listPCRId);
router.put('/admin/pcrs/:id', updatePCRId);
router.delete('/admin/pcrs/:id', deletePCRId);

// -- Industrial --
router.get('/admin/industrials', listIndustrial);
router.post('/admin/industrials', createIndustrial);
router.get('/admin/industrials/:id', listIndustrialId);
router.put('/admin/industrials/:id', updateIndustrialId);
router.delete('/admin/industrials/:id', deleteIndustrialId);

// -- TGO --
router.get('/admin/tgoef', listTGOef);
router.post('/admin/tgoef', createTGOef);
router.get('/admin/tgoef/:id', listTGOefId);
router.put('/admin/tgoef/:id', updateTGOefId);
router.delete('/admin/tgoef/:id', deleteTGOefId);
router.get('/admin/tgoefcategories', listTGOefCategories);
router.get('/admin/tgoefsubcategories', listTGOefSubCategories);

module.exports = router;