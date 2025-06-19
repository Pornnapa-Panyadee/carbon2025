const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        const query = 'INSERT INTO reports SET ?';
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const query = 'UPDATE reports SET ? WHERE id = ?';
        const [result] = await db.query(query, [data, data.id]);
        return result;
    },
    readperID: async (id) => {
        const query = 'SELECT * FROM reports WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    readperIDuser: async (id) => {
        const query = 'SELECT * FROM reports WHERE company_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM reports WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    }

};

module.exports = Report;