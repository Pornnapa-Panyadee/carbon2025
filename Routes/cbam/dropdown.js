const express = require('express');
const router = express.Router(); // Use router instead of app

const { listcncodes,
    listsrcelectconsumptions,
    listsrcefelectricitys,
    listjustification,
    listqtyassurances,
    listdataqlys,
    listemissions,
    listefunits,
    listadunits
} = require('../../Controllers/cbam/dropdown');

// Province
router.get('/cncodes', listcncodes);
router.get('/srcelectconsumptions', listsrcelectconsumptions);
router.get('/srcefelectricitys', listsrcefelectricitys);
router.get('/justification', listjustification);
router.get('/qtyassurances', listqtyassurances);
router.get('/dataqlys', listdataqlys);
router.get('/emissions', listemissions);
router.get('/efunits', listefunits);
router.get('/adunits', listadunits);


module.exports = router; // Export the router