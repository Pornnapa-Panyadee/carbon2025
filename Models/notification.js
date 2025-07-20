const db = require('../Config/db.js');

const notificationModel = {
    createNotificationAuditor: async (data) => {

        const query = 'INSERT INTO  notifications SET ?, created_at = NOW(), updated_at = NOW() ';
        const [result] = await db.query(query, data);
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
        const query = 'INSERT INTO notifications SET ?, created_at = NOW(), updated_at = NOW()';
        const [result] = await db.query(query, data);
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