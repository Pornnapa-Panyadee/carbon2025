const db = require('../Config/db.js');

const form61Model = {
    create: async (data) => {
        const query = 'INSERT INTO cfp_report61_sums SET ?, created_date = NOW(), updated_date = NOW() , year = YEAR(NOW())';
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

    readperIdYear: async (id, year) => {
        const query = 'SELECT * FROM cfp_report61_sums WHERE product_id = ? AND year = ?';
        const [result] = await db.query(query, [id, year]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM cfp_report61_sums WHERE report61_sum_id = ?';
        const [result] = await db.query(query, [id]);
        return result; // ส่ง result กลับไปให้ controller จัดการ
    },
    readperIdreport: async (product_id) => {
        const f41 = 'SELECT * FROM cfp_report41_sums WHERE product_id = ?';
        const [result41] = await db.query(f41, [product_id]);

        const f42 = 'SELECT * FROM cfp_report42_sums WHERE product_id = ?';
        const [result42] = await db.query(f42, [product_id]);

        const r41 = result41[0] || {};
        const r42 = result42[0] || {};

        // รวมค่าแต่ละฟิลด์ (ถ้าไม่มีให้ถือเป็น 0)
        const sum_lc1_emission = (Number(r41.sum_lc1_emission) || 0) + (Number(r42.sum_lc1_emission) || 0);
        const sum_lc2_emission = (Number(r41.sum_lc2_emission) || 0) + (Number(r42.sum_lc2_emission) || 0);
        const sum_lc3_emission = (Number(r41.sum_lc3_emission) || 0) + (Number(r42.sum_lc3_emission) || 0);
        const sum_lc4_emission = (Number(r41.sum_lc4_emission) || 0) + (Number(r42.sum_lc4_emission) || 0);
        const sum_lc5_emission = (Number(r41.sum_lc5_emission) || 0) + (Number(r42.sum_lc5_emission) || 0);

        return {
            sum_lc1_emission,
            sum_lc2_emission,
            sum_lc3_emission,
            sum_lc4_emission,
            sum_lc5_emission,
            total_emission: sum_lc1_emission + sum_lc2_emission + sum_lc3_emission + sum_lc4_emission + sum_lc5_emission,
            r41,
            r42
        };
    },
};

module.exports = form61Model;