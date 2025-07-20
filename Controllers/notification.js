const notificationModel = require('../Models/notification');

// สร้าง notification ใหม่
exports.createNotificationAuditor = async (req, res) => {
    try {
        const data = req.body;

        // ตั้งค่าคงที่ก่อนตรวจสอบ
        // data.message_alert = "ผู้ทวนสอบได้ตอบกลับผลิตภัณฑ์ของคุณ";
        data.create_by = "auditor";

        if (!data.auditor_id) {
            return res.status(400).json({ message: "auditor_id is required." });
        }

        const result = await notificationModel.createNotificationAuditor(data);
        res.status(201).json({
            message: "Notification created successfully",
            notification_id: result.insertId
        });
    } catch (error) {
        console.error("Create Notification Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


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

exports.createNotificationCompany = async (req, res) => {
    try {
        const data = req.body;

        // ตั้งค่าคงที่ก่อนตรวจสอบ
        // data.message_alert = "สถานประกอบการได้ส่งคำขอพิจารณาแบบฟอร์ม CFP";
        data.create_by = "company";

        if (!data.company_id) {
            return res.status(400).json({ message: "company_id is required." });
        }

        const result = await notificationModel.createNotificationCompany(data);
        res.status(201).json({
            message: "Notification created successfully",
            notification_id: result.insertId
        });
    } catch (error) {
        console.error("Create Notification Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getNotificationsByCompany = async (req, res) => {
    try {
        const company_id = req.params.company_id;

        if (!company_id) {
            return res.status(400).json({ message: "company_id is required" });
        }

        const notifications = await notificationModel.getNotificationsByCompany({ company_id });

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Get Notifications Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.markAsReadByCompany = async (req, res) => {
    try {
        const company_id = req.params.company_id;

        if (!company_id) {
            return res.status(400).json({ message: "company_id is required" });
        }

        await notificationModel.markAsReadByCompany({ company_id });

        res.status(200).json({ message: "Marked all as read" });
    } catch (error) {
        console.error("Mark as Read Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};