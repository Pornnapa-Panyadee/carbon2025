const db = require('../Config/db.js');


const inputModel = {
    create: async (data, callback) => {
        try {
            const sql = `INSERT INTO input_categories (input_cat_name ) VALUES (?)`;

            db.query(sql, [data.input_cat_name], (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    findAll: (callback) => {
        const query = ` SELECT * FROM input_categories`;
        db.query(query, callback);
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM input_categories WHERE input_cat_id    = ?', [id], callback);
    },

    updateById: (id, data, callback) => {
        db.query('SELECT * FROM input_categories WHERE input_cat_id  = ?', [id], (err, [process]) => {
            if (err || !process) return callback(err, process);

            const { input_cat_name = process.input_cat_name } = data;

            const sql = `  UPDATE input_categories SET input_cat_name = ? WHERE input_cat_id = ? `;
            db.query(sql, [input_cat_name, id], callback);
        });
    },

    deleteById: (id, callback) => {
        db.query('DELETE FROM input_categories WHERE input_cat_id = ?', [id], callback);
    },

    // Process

    createProcess: async (data, callback) => {
        try {
            const sql = `INSERT INTO input_processes (	process_id , input_cat_id, input_name, input_unit, input_quantity, life_cycle_phase, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;

            db.query(sql, [data.process_id, data.input_cat_id, data.input_name, data.input_unit, data.input_quantity, data.life_cycle_phase], (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    findAllProcess: (callback) => {
        const query = ` SELECT * FROM input_processes`;
        db.query(query, callback);
    },

    findByIdProcess: (id, callback) => {
        db.query('SELECT * FROM input_processes WHERE input_process_id     = ?', [id], callback);
    },

    updateByIdProcess: (id, data, callback) => {
        db.query('SELECT * FROM input_processes WHERE input_process_id   = ?', [id], (err, [process]) => {
            if (err || !process) return callback(err, process);

            const { process_id = process.process_id,
                input_cat_id = process.input_cat_id,
                input_name = process.input_name,
                input_unit = process.input_unit,
                input_quantity = process.input_quantity,
                life_cycle_phase = process.life_cycle_phase
            } = data;

            const sql = `  UPDATE input_processes SET process_id = ?,input_cat_id = ?, input_name = ?, input_unit = ?, input_quantity = ?, life_cycle_phase = ? WHERE input_process_id  = ? `;
            db.query(sql, [process_id, input_cat_id, input_name, input_unit, input_quantity, life_cycle_phase, id], callback);
        });
    },

    deleteByIdProcess: (id, callback) => {
        db.query('DELETE FROM input_processes WHERE input_process_id  = ?', [id], callback);
    }
};


module.exports = inputModel;

