const db = require('../Config/db.js');

const form61Model = {
    create: async (data) => {
        const query = 'INSERT INTO cfp_report61_sums SET ?, created_date = NOW(), updated_date = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const { id, ...updateFields } = data; // แยก id ออก

        const query = 'UPDATE cfp_report61_sums SET ? WHERE report61_sum_id = ?';
        const [result] = await db.query(query, [updateFields, id]);

        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM cfp_report61_sums WHERE product_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM cfp_report61_sums WHERE report61_sum_id = ?';
        const [result] = await db.query(query, [id]);
        return result; // ส่ง result กลับไปให้ controller จัดการ
    },
    readperIdreport: async (id) => {
        const query = 'SELECT * FROM cfp_report61_sums WHERE product_id  = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
};

module.exports = form61Model;