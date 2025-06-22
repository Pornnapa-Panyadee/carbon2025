const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        const query = 'INSERT INTO b_emission_installations SET ?, created_at = NOW(), updated_at = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const query = 'UPDATE b_emission_installations SET ? WHERE id = ?';
        const [result] = await db.query(query, [data, data.id]);
        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM b_emission_installations WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM b_emission_installations WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    readperIdreport: async (id) => {
        const query = 'SELECT * FROM b_emission_installations WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteByIdreport: async (id) => {
        const query = 'DELETE FROM b_emission_installations WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },

};

module.exports = Report;