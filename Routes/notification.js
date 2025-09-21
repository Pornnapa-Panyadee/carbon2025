const express = require('express');
const router = express.Router();
const { createNotificationAuditor, getNotificationsByAuditor, markAsReadByAuditor,
    createNotificationCompany, getNotificationsByCompany, markAsReadByCompany
} = require('../Controllers/notification');
authenticateToken = require('../Middlewares/auth');


// POST /api/notifications/auditor
router.post('/notifications/auditor', createNotificationAuditor, authenticateToken);
router.get('/notifications/auditor/:auditor_id', getNotificationsByAuditor, authenticateToken);
router.put('/notifications/auditor/read/:auditor_id', markAsReadByAuditor, authenticateToken);

// POST /api/notifications/company
router.post('/notifications/company', createNotificationCompany, authenticateToken);
router.get('/notifications/company/:company_id', getNotificationsByCompany, authenticateToken);
router.put('/notifications/company/read/:company_id', markAsReadByCompany, authenticateToken);


module.exports = router;