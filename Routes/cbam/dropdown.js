const express = require('express');
const router = express.Router(); // Use router instead of app
const authenticateToken = require('../../Middlewares/auth');
const { listcncodes,
    listcncodesbygoodsid,
    listsrcelectconsumptions,
    listsrcefelectricitys,
    listjustification,
    listqtyassurances,
    listdataqlys,
    listemissions,
    listefunits,
    listadunits, putsrcefelectricitys
} = require('../../Controllers/cbam/dropdown');

// Province
router.get('/cncodes', authenticateToken, listcncodes);
router.get('/cncodes/:goods_id', authenticateToken, listcncodesbygoodsid);
router.get('/srcelectconsumptions', authenticateToken, listsrcelectconsumptions);
router.get('/srcefelectricitys', authenticateToken, listsrcefelectricitys);
router.get('/justification', authenticateToken, listjustification);
router.get('/qtyassurances', authenticateToken, listqtyassurances);
router.get('/dataqlys', authenticateToken, listdataqlys);
router.get('/emissions', authenticateToken, listemissions);
router.get('/efunits', authenticateToken, listefunits);
router.get('/adunits', authenticateToken, listadunits);


router.put('/srcefelectricitys/:id', authenticateToken, putsrcefelectricitys);


module.exports = router; // Export the router