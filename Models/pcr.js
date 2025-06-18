const db = require('../Config/db.js');

const pcrModel = {
    create: async (data) => {
        const sql = `
                INSERT INTO pcrs (pcr_name, approval_date,pcr_type)
                VALUES (?, ?, ?)
            `;
        const [results] = await db.query(sql, [
            data.pcr_name,
            data.approval_date,
            data.pcr_type
        ]);
        return results;
    },

    findAll: async () => {
        const [rows] = await db.query(`SELECT * FROM pcrs`);

        const grouped = {
            'ข้อกำหนดระดับประเทศ': rows.filter(r => r.pcr_type_id === 1),
            'ข้อกำหนดทั่วไป': rows.filter(r => r.pcr_type_id === 2),
        };

        return grouped;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM pcrs WHERE id = ?', [id]);
        return rows[0] || null;
    },

    updateById: async (id, data) => {
        const [rows] = await db.query('SELECT * FROM pcrs WHERE id = ?', [id]);
        if (!rows || rows.length === 0) throw new Error('PCR not found');

        const pcr = rows[0];
        const {
            pcr_name = pcr.pcr_name,
            approval_date = pcr.approval_date,
            pcr_type = pcr.pcr_type
        } = data;

        const sql = `
                UPDATE pcrs SET pcr_name = ?, approval_date = ?, pcr_type = ?
                WHERE id = ?
            `;
        const [result] = await db.query(sql, [pcr_name, approval_date, pcr_type, id]);
        return result;
    },

    deleteById: async (id) => {
        const [result] = await db.query('DELETE FROM pcrs WHERE id = ?', [id]);
        return result;
    },

};

module.exports = pcrModel;
