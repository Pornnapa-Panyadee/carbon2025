const db = require('../Config/db.js');


const outputModel = {
    // Output Category
    create: async (data) => {
        const sql = `INSERT INTO output_categories (output_cat_name) VALUES (?)`;
        const [results] = await db.query(sql, [data.output_cat_name]);
        return results;
    },

    findAll: async () => {
        const [rows] = await db.query(`SELECT * FROM output_categories`);
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM output_categories WHERE output_cat_id = ?', [id]);
        return rows[0] || null;
    },

    updateById: async (id, data) => {
        const [rows] = await db.query('SELECT * FROM output_categories WHERE output_cat_id = ?', [id]);
        if (!rows || rows.length === 0) throw new Error('Output category not found');
        const process = rows[0];
        const { output_cat_name = process.output_cat_name } = data;
        const sql = `UPDATE output_categories SET output_cat_name = ? WHERE output_cat_id = ?`;
        const [result] = await db.query(sql, [output_cat_name, id]);
        return result;
    },

    deleteById: async (id) => {
        const [result] = await db.query('DELETE FROM output_categories WHERE output_cat_id = ?', [id]);
        return result;
    },

    // Output Process
    createProcess: async (data) => {
        const query = 'INSERT INTO output_processes SET ?, created_date = NOW(), updated_date = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },

    findAllProcess: async () => {
        const [rows] = await db.query(`SELECT * FROM output_processes`);
        return rows;
    },

    findByIdProcess: async (id) => {
        const [rows] = await db.query('SELECT * FROM output_processes WHERE output_process_id = ?', [id]);
        return rows[0] || null;
    },

    updateByIdProcess: async (id, data) => {
        const [rows] = await db.query('SELECT * FROM output_processes WHERE output_process_id = ?', [id]);
        if (!rows || rows.length === 0) throw new Error('Output process not found');
        const process = rows[0];
        const {
            process_id = process.process_id,
            output_cat_id = process.output_cat_id,
            output_name = process.output_name,
            output_unit = process.output_unit,
            output_quantity = process.output_quantity,
            finish_output = process.finish_output,
            packaging_output = process.packaging_output

        } = data;
        const sql = `UPDATE output_processes SET process_id = ?, output_cat_id = ?, output_name = ?, output_unit = ?, output_quantity = ?, life_cycle_phase = ? WHERE output_process_id = ?`;
        const [result] = await db.query(sql, [process_id, output_cat_id, output_name, output_unit, output_quantity, finish_output, packaging_output, id]);
        return result;
    },

    deleteByIdProcess: async (id) => {
        const [result] = await db.query('DELETE FROM output_processes WHERE output_process_id = ?', [id]);
        return result;
    }
};


module.exports = outputModel;

