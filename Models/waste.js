const db = require('../Config/db.js');


const wasteModel = {
    // Waste Category
    create: async (data) => {
        const sql = `INSERT INTO waste_categories (waste_cat_name) VALUES (?)`;
        const [results] = await db.query(sql, [data.waste_cat_name]);
        return results;
    },

    findAll: async () => {
        const [rows] = await db.query(`SELECT * FROM waste_categories`);
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM waste_categories WHERE waste_cat_id = ?', [id]);
        return rows[0] || null;
    },

    updateById: async (id, data) => {
        const [rows] = await db.query('SELECT * FROM waste_categories WHERE waste_cat_id = ?', [id]);
        if (!rows || rows.length === 0) throw new Error('waste category not found');
        const process = rows[0];
        const { waste_cat_name = process.waste_cat_name } = data;
        const sql = `UPDATE waste_categories SET waste_cat_name = ? WHERE waste_cat_id = ?`;
        const [result] = await db.query(sql, [waste_cat_name, id]);
        return result;
    },

    deleteById: async (id) => {
        const [result] = await db.query('DELETE FROM waste_categories WHERE waste_cat_id = ?', [id]);
        return result;
    },

    // waste Process
    createProcess: async (data) => {
        const query = 'INSERT INTO waste_processes SET ?, created_date = NOW(), updated_date = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },

    findAllProcess: async () => {
        const [rows] = await db.query(`SELECT * FROM waste_processes`);
        return rows;
    },

    findByIdProcess: async (id) => {
        const [rows] = await db.query('SELECT * FROM waste_processes WHERE waste_process_id = ?', [id]);
        return rows[0] || null;
    },

    updateByIdProcess: async (id, data) => {
        const [rows] = await db.query('SELECT * FROM waste_processes WHERE waste_process_id = ?', [id]);
        if (!rows || rows.length === 0) throw new Error('waste process not found');
        const process = rows[0];
        const {
            process_id = process.process_id,
            waste_cat_id = process.waste_cat_id,
            waste_name = process.waste_name,
            waste_unit = process.waste_unit,
            waste_qty = process.waste_qty,
            life_cycle_phase = process.life_cycle_phase
        } = data;
        const sql = `UPDATE waste_processes SET process_id = ?, waste_cat_id = ?, waste_name = ?, waste_unit = ?, waste_qty = ?, life_cycle_phase = ? WHERE waste_process_id = ?`;
        const [result] = await db.query(sql, [process_id, waste_cat_id, waste_name, waste_unit, waste_qty, life_cycle_phase, id]);
        return result;
    },

    deleteByIdProcess: async (id) => {
        const [result] = await db.query('DELETE FROM waste_processes WHERE waste_process_id = ?', [id]);
        return result;
    }
};


module.exports = wasteModel;

