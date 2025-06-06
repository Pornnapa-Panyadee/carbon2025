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
        const sql = `INSERT INTO output_processes (process_id, output_cat_id, output_name, output_unit, output_quantity, life_cycle_phase, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;
        const [results] = await db.query(sql, [
            data.process_id,
            data.output_cat_id,
            data.output_name,
            data.output_unit,
            data.output_quantity,
            data.life_cycle_phase
        ]);
        return results;
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
            life_cycle_phase = process.life_cycle_phase
        } = data;
        const sql = `UPDATE output_processes SET process_id = ?, output_cat_id = ?, output_name = ?, output_unit = ?, output_quantity = ?, life_cycle_phase = ? WHERE output_process_id = ?`;
        const [result] = await db.query(sql, [process_id, output_cat_id, output_name, output_unit, output_quantity, life_cycle_phase, id]);
        return result;
    },

    deleteByIdProcess: async (id) => {
        const [result] = await db.query('DELETE FROM output_processes WHERE output_process_id = ?', [id]);
        return result;
    }
};


module.exports = outputModel;

