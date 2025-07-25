const db = require('../Config/db.js');


const inputModel = {
    // Input Category
    create: async (data) => {
        const sql = `INSERT INTO input_categories (input_cat_name) VALUES (?)`;
        const [results] = await db.query(sql, [data.input_cat_name]);
        return results;
    },

    findAll: async () => {
        const [rows] = await db.query(`
            SELECT MIN(input_cat_id) AS input_cat_id,
                   input_title AS category_names,
                   GROUP_CONCAT(input_cat_name_TH ORDER BY input_cat_id) AS Notes
            FROM input_categories
            GROUP BY input_title
        `);
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM input_categories WHERE input_cat_id = ?', [id]);
        return rows[0] || null;
    },

    updateById: async (id, data) => {
        const [rows] = await db.query('SELECT * FROM input_categories WHERE input_cat_id = ?', [id]);
        if (!rows || rows.length === 0) throw new Error('Input category not found');
        const process = rows[0];
        const { input_cat_name = process.input_cat_name } = data;
        const sql = `UPDATE input_categories SET input_cat_name = ? WHERE input_cat_id = ?`;
        const [result] = await db.query(sql, [input_cat_name, id]);
        return result;
    },

    deleteById: async (id) => {
        const [result] = await db.query('DELETE FROM input_categories WHERE input_cat_id = ?', [id]);
        return result;
    },

    // Input Process
    // createProcess: async (data) => {
    //     const sql = `INSERT INTO input_processes (process_id, input_cat_id, input_name, input_unit, input_quantity, life_cycle_phase, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;
    //     const [results] = await db.query(sql, [
    //         data.process_id,
    //         data.input_cat_id,
    //         data.input_name,
    //         data.input_unit,
    //         data.input_quantity,
    //         data.life_cycle_phase
    //     ]);
    //     return results;
    // },
    createProcess: async (data) => {
        const query = 'INSERT INTO input_processes SET ?, created_date = NOW(), updated_date = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },


    findAllProcess: async () => {
        const [rows] = await db.query(`SELECT * FROM input_processes`);
        return rows;
    },

    findByIdProcess: async (id) => {
        const [rows] = await db.query('SELECT * FROM input_processes WHERE input_process_id = ?', [id]);
        return rows[0] || null;
    },

    updateByIdProcess: async (id, data) => {
        const [rows] = await db.query('SELECT * FROM input_processes WHERE input_process_id = ?', [id]);
        if (!rows || rows.length === 0) throw new Error('Input process not found');

        // สร้าง SQL และ parameters แบบไดนามิก
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        if (fields.length === 0) {
            throw new Error('No fields to update');
        }

        const sql = `UPDATE input_processes SET ${fields.join(', ')} WHERE input_process_id = ?`;
        values.push(id); // id ใส่ไว้ตัวสุดท้ายใน values ตามตำแหน่ง `?`

        const [result] = await db.query(sql, values);
        return result;
    },

    deleteByIdProcess: async (id) => {
        const [result] = await db.query('DELETE FROM input_processes WHERE input_process_id = ?', [id]);
        return result;
    }
};


module.exports = inputModel;

