const db = require('../Config/db.js');


const processModel = {

    create: async (data) => {
        const query = 'INSERT INTO processes SET ?, created_date = NOW(), updated_date = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },

    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM processes');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM processes WHERE process_id = ?', [id]);
        return rows[0] || null;
    },

    findByProduct: async (id) => {
        const [rows] = await db.query('SELECT * FROM processes WHERE product_id = ?', [id]);
        return rows || null;
    },

    // updateById: async (data) => {
    //     const query = 'UPDATE processes SET ? WHERE id = ?';
    //     const [result] = await db.query(query, [data, data.id]);
    //     return result;
    // },


    updateById: async (id, data) => {
        const [rows] = await db.query('SELECT * FROM processes WHERE process_id = ?', [id]);
        if (!rows || rows.length === 0) throw new Error('Process not found');

        const process = rows[0];
        const {
            product_id = process.product_id,
            ordering = process.ordering,
            process_name = process.process_name,
            mass_balanced = process.mass_balanced
        } = data;

        const sql = `
            UPDATE processes SET product_id = ?, ordering = ?, process_name = ?, mass_balanced = ?, updated_date = NOW()
            WHERE process_id = ?
        `;
        const [result] = await db.query(sql, [product_id, ordering, process_name, mass_balanced, id]);
        return result;
    },

    deleteById: async (id) => {
        const [result] = await db.query('DELETE FROM processes WHERE process_id = ?', [id]);
        return result;
    }
};


module.exports = processModel;

