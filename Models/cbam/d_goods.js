const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        const query = 'INSERT INTO d_processes SET ?';
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const query = 'UPDATE d_processes SET ? WHERE id = ?';
        const [result] = await db.query(query, [data, data.id]);
        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM d_processes WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM d_processes WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    readperIdreport: async (id) => {
        const query = 'SELECT * FROM d_processes WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteByIdreport: async (id) => {
        const query = 'DELETE FROM d_processes WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },

};

module.exports = Report;