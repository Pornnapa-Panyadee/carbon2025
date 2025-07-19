const notificationModel = require('../Models/notification');

// สร้าง notification ใหม่
exports.createNotification = async (req, res) => {
    try {
        const data = req.body;

        // ตรวจสอบว่ามีข้อมูลครบไหม
        if (!data.auditor_id || !data.message) {
            return res.status(400).json({ message: "auditor_id and message are required." });
        }

        const result = await notificationModel.createNotification(data);

        res.status(201).json({
            message: "Notification created successfully",
            notification_id: result.insertId
        });
    } catch (error) {
        console.error("Create Notification Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ดึง notify ของ auditor ตาม auditor_id
exports.getNotificationsByAuditor = async (req, res) => {
    try {
        const auditor_id = req.params.auditor_id;

        if (!auditor_id) {
            return res.status(400).json({ message: "auditor_id is required" });
        }

        const notifications = await notificationModel.getNotificationsByAuditor({ auditor_id });

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Get Notifications Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// mark ว่า auditor อ่านแจ้งเตือนหมดแล้ว
exports.markAsReadByAuditor = async (req, res) => {
    try {
        const auditor_id = req.params.auditor_id;

        if (!auditor_id) {
            return res.status(400).json({ message: "auditor_id is required" });
        }

        await notificationModel.markAsReadByAuditor({ auditor_id });

        res.status(200).json({ message: "Marked all as read" });
    } catch (error) {
        console.error("Mark as Read Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};