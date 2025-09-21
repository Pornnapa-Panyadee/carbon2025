const express = require('express');
const router = express.Router();
const { listDashboard, listRound, createRound, listRoundId, updateRoundId, deleteRoundId,
    listUnit, createUnit, listUnitId, updateUnitId, deleteUnitId,
    listPCR, createPCR, listPCRId, updatePCRId, deletePCRId,
    listIndustrial, createIndustrial, listIndustrialId, updateIndustrialId, deleteIndustrialId,
    listTGOef, createTGOef, listTGOefId, updateTGOefId, deleteTGOefId, listTGOefCategories, listTGOefSubCategories,
    listCompanies, listCompanyId, deleteCompanyId,
    createUser, listUser, readUserId, updateUserId, deleteUserId

} = require('../Controllers/admin');
const authenticateToken = require('../Middlewares/auth');

// Dashboard
router.get('/admin/dashboard', listDashboard, authenticateToken);

// Information
// -- Round --
router.get('/admin/rounds', listRound, authenticateToken);
router.post('/admin/rounds', createRound, authenticateToken);
router.get('/admin/rounds/:id', listRoundId, authenticateToken);
router.put('/admin/rounds/:id', updateRoundId, authenticateToken);
router.delete('/admin/rounds/:id', deleteRoundId, authenticateToken);

// -- Unit --
router.get('/admin/units', listUnit, authenticateToken);
router.post('/admin/units', createUnit, authenticateToken);
router.get('/admin/units/:id', listUnitId, authenticateToken);
router.put('/admin/units/:id', updateUnitId, authenticateToken);
router.delete('/admin/units/:id', deleteUnitId, authenticateToken);

// -- PCR --
router.get('/admin/pcrs', listPCR, authenticateToken);
router.post('/admin/pcrs', createPCR, authenticateToken);
router.get('/admin/pcrs/:id', listPCRId, authenticateToken);
router.put('/admin/pcrs/:id', updatePCRId, authenticateToken);
router.delete('/admin/pcrs/:id', deletePCRId, authenticateToken);

// -- Industrial --
router.get('/admin/industrials', listIndustrial, authenticateToken);
router.post('/admin/industrials', createIndustrial, authenticateToken);
router.get('/admin/industrials/:id', listIndustrialId, authenticateToken);
router.put('/admin/industrials/:id', updateIndustrialId, authenticateToken);
router.delete('/admin/industrials/:id', deleteIndustrialId, authenticateToken);

// -- TGO --
router.get('/admin/tgoef', listTGOef, authenticateToken);
router.post('/admin/tgoef', createTGOef, authenticateToken);
router.get('/admin/tgoef/:id', listTGOefId, authenticateToken);
router.put('/admin/tgoef/:id', updateTGOefId, authenticateToken);
router.delete('/admin/tgoef/:id', deleteTGOefId, authenticateToken);
router.get('/admin/tgoefcategories', listTGOefCategories, authenticateToken);
router.get('/admin/tgoefsubcategories', listTGOefSubCategories, authenticateToken);

//--Company--
router.get('/admin/companies', listCompanies, authenticateToken);
router.get('/admin/companies/:id', listCompanyId, authenticateToken);
router.delete('/admin/companies/:id', deleteCompanyId, authenticateToken);


// User
router.post('/admin/users', createUser, authenticateToken);
router.get('/admin/users', listUser, authenticateToken);
router.get('/admin/users/:user_id', readUserId, authenticateToken);
router.put('/admin/users/:user_id', updateUserId, authenticateToken);
router.delete('/admin/users/:user_id', deleteUserId, authenticateToken);

module.exports = router;