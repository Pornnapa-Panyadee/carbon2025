const db = require('../Config/db.js');

const notificationModel = {
    createNotificationAuditor: async (data) => {
        const productQuery = 'SELECT product_name_th FROM products WHERE product_id = ?';
        const [rows] = await db.query(productQuery, [data.product_id]);

        const product_name = rows[0]?.product_name_th || "ผลิตภัณฑ์ที่ไม่ทราบชื่อ";
        const message_alert = `ผู้ทวนสอบได้เพิ่มประเด็นที่ต้องปรับปรุงผลิตภัณฑ์ ${product_name} ของคุณ`;
        // เพิ่ม message_alert เข้าไปใน data
        const notificationData = {
            ...data,
            message_alert
        };

        const query = 'INSERT INTO notifications SET ?, created_at = NOW(), updated_at = NOW()';
        const [result] = await db.query(query, notificationData);

        return result;
    },
    getNotificationsByAuditor: async (data) => {
        const query = 'SELECT * FROM notifications WHERE auditor_id = ? AND create_by=? AND is_read=?';
        const [result] = await db.query(query, [data.auditor_id, "company", 0]);
        return result;
    },
    markAsReadByAuditor: async (data) => {
        const query = 'UPDATE notifications SET is_read = 1 WHERE auditor_id = ?';
        const [result] = await db.query(query, [data.auditor_id]);
        return result;
    },

    createNotificationCompany: async (data) => {
        const productQuery = 'SELECT product_name_th FROM products WHERE product_id = ?';
        const [rows] = await db.query(productQuery, [data.product_id]);

        const product_name = rows[0]?.product_name_th || "ผลิตภัณฑ์ที่ไม่ทราบชื่อ";
        const message_alert = `สถานประกอบการได้ยื่นคำขอพิจารณาแบบฟอร์มรายงาน CFP สำหรับผลิตภัณฑ์${product_name} `;
        // เพิ่ม message_alert เข้าไปใน data
        const notificationData = {
            ...data,
            message_alert
        };

        const query = 'INSERT INTO notifications SET ?, created_at = NOW(), updated_at = NOW()';
        const [result] = await db.query(query, notificationData);
        const product = 'UPDATE products  SET verify_status = "Pending" WHERE product_id  = ?';
        const [result_product] = await db.query(product, [data.product_id]);

        return result;
    },
    getNotificationsByCompany: async (data) => {
        const query = 'SELECT * FROM notifications WHERE company_id = ? AND create_by=? AND is_read=?';
        const [result] = await db.query(query, [data.company_id, "auditor", 0]);
        return result;
    },
    markAsReadByCompany: async (data) => {
        const query = 'UPDATE notifications SET is_read = 1 WHERE company_id = ?';
        const [result] = await db.query(query, [data.company_id]);
        return result;
    },

}

module.exports = notificationModel;