const db = require('../Config/db.js');

const industryModel = {
    create: async (data) => {
        const sql = `
            INSERT INTO industrials (industrial_name, required_cbam)
            VALUES (?, ?)
        `;
        const [results] = await db.query(sql, [
            data.industrial_name,
            data.required_cbam
        ]);
        return results;
    },

    findAll: async () => {
        const [rows] = await db.query(`SELECT * FROM industrials`);
        return rows;
    },

    findById: async (industrial_id) => {
        const [rows] = await db.query('SELECT * FROM industrials WHERE industrial_id = ?', [industrial_id]);
        return rows[0] || null;
    },

    updateById: async (industrial_id, data) => {
        const [rows] = await db.query('SELECT * FROM industrials WHERE industrial_id = ?', [industrial_id]);
        if (!rows || rows.length === 0) throw new Error('Industrial not found');

        const industrial = rows[0];
        const {
            industrial_name = industrial.industrial_name,
            required_cbam = industrial.required_cbam
        } = data;

        const sql = `
            UPDATE industrials SET industrial_name = ?, required_cbam = ?
            WHERE industrial_id = ?
        `;
        const [result] = await db.query(sql, [industrial_name, required_cbam, industrial_id]);
        return result;
    },

    deleteById: async (industrial_id) => {
        const [result] = await db.query('DELETE FROM industrials WHERE industrial_id = ?', [industrial_id]);
        return result;
    }
};

module.exports = industryModel;