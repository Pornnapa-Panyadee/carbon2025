const express = require('express');
const router = express.Router(); // Use router instead of app

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
router.get('/cncodes', listcncodes);
router.get('/cncodes/:goods_id', listcncodesbygoodsid);
router.get('/srcelectconsumptions', listsrcelectconsumptions);
router.get('/srcefelectricitys', listsrcefelectricitys);
router.get('/justification', listjustification);
router.get('/qtyassurances', listqtyassurances);
router.get('/dataqlys', listdataqlys);
router.get('/emissions', listemissions);
router.get('/efunits', listefunits);
router.get('/adunits', listadunits);


router.put('/srcefelectricitys/:id', putsrcefelectricitys);


module.exports = router; // Export the router