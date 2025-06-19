const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        const query = 'INSERT INTO c_emission_energies SET ?';
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const query = 'UPDATE c_emission_energies SET ? WHERE id = ?';
        const [result] = await db.query(query, [data, data.id]);
        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM c_emission_energies WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM c_emission_energies WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    readperIdreport: async (id) => {
        const query = 'SELECT * FROM c_emission_energies WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteByIdreport: async (id) => {
        const query = 'DELETE FROM c_emission_energies WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },

};

module.exports = Report;