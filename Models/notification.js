const db = require('../Config/db.js');

const notificationModel = {
    createNotification: async (data) => {

        const query = 'INSERT INTO  notifications SET ?, created_at = NOW(), updated_at = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },


    getNotificationsByAuditor: async (data) => {
        const query = 'SELECT * FROM notifications WHERE auditor_id = ?';
        const [result] = await db.query(query, [data.auditor_id]);
        return result;
    },

    markAsReadByAuditor: async (data) => {
        const query = 'UPDATE notifications SET is_read = 1 WHERE auditor_id = ?';
        const [result] = await db.query(query, [data.auditor_id]);
        return result;
    },
}

module.exports = notificationModel;