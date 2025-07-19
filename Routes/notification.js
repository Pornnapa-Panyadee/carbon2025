const express = require('express');
const router = express.Router();
const { createNotification, getNotificationsByAuditor, markAsReadByAuditor } = require('../Controllers/notification');


// POST /api/notifications
router.post('/notifications', createNotification);

// GET /api/notifications/:auditor_id
router.get('/notifications/:auditor_id', getNotificationsByAuditor);

// PUT /api/notifications/read/:auditor_id
router.put('/notifications/read/:auditor_id', markAsReadByAuditor);

module.exports = router;