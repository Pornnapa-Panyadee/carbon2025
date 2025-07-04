const db = require('../Config/db.js');

const form62Model = {
    create: async (data) => {
        const query = 'INSERT INTO cfp_report62_sums SET ?, created_date = NOW(), updated_date = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const { id, ...updateFields } = data; // แยก id ออก

        const query = 'UPDATE cfp_report62_sums SET ? WHERE product_id = ?';
        const [result] = await db.query(query, [updateFields, id]);

        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM cfp_report62_sums WHERE product_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM cfp_report62_sums WHERE report62_sum_id = ?';
        const [result] = await db.query(query, [id]);
        return result; // ส่ง result กลับไปให้ controller จัดการ
    },
};

module.exports = form62Model;