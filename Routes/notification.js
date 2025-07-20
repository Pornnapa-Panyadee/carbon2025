const express = require('express');
const router = express.Router();
const { createNotificationAuditor, getNotificationsByAuditor, markAsReadByAuditor,
    createNotificationCompany, getNotificationsByCompany, markAsReadByCompany
} = require('../Controllers/notification');


// POST /api/notifications/auditor
router.post('/notifications/auditor', createNotificationAuditor);
router.get('/notifications/auditor/:auditor_id', getNotificationsByAuditor);
router.put('/notifications/auditor/read/:auditor_id', markAsReadByAuditor);

// POST /api/notifications/company
router.post('/notifications/company', createNotificationCompany);
router.get('/notifications/company/:company_id', getNotificationsByCompany);
router.put('/notifications/company/read/:company_id', markAsReadByCompany);


module.exports = router;