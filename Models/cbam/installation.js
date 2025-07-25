const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        const query = `
                INSERT INTO installations
                SET ?, 
                created_at = NOW(),
                updated_at = NOW()
            `;
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const query = 'UPDATE installations SET ? WHERE id = ?';
        const [result] = await db.query(query, [data, data.id]);
        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM installations WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    readAll: async () => {
        const query = 'SELECT * FROM installations ';
        const [result] = await db.query(query);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM installations WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    }

};

module.exports = Report;