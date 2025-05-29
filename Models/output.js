const db = require('../Config/db.js');


const outputModel = {
    create: async (data, callback) => {
        try {
            const sql = `INSERT INTO output_categories (output_cat_name	 ) VALUES (?)`;

            db.query(sql, [data.output_cat_name], (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    findAll: (callback) => {
        const query = ` SELECT * FROM output_categories`;
        db.query(query, callback);
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM output_categories WHERE output_cat_id    = ?', [id], callback);
    },

    updateById: (id, data, callback) => {
        db.query('SELECT * FROM output_categories WHERE output_cat_id  = ?', [id], (err, [process]) => {
            if (err || !process) return callback(err, process);

            const { output_cat_name = process.output_cat_name } = data;

            const sql = `  UPDATE output_categories SET output_cat_name = ? WHERE output_cat_id = ? `;
            db.query(sql, [output_cat_name, id], callback);
        });
    },

    deleteById: (id, callback) => {
        db.query('DELETE FROM output_categories WHERE output_cat_id = ?', [id], callback);
    },

    // Process

    createProcess: async (data, callback) => {
        try {
            const sql = `INSERT INTO output_processes (	process_id , output_cat_id, output_name, output_unit, output_quantity, life_cycle_phase, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;

            db.query(sql, [data.process_id, data.output_cat_id, data.output_name, data.output_unit, data.output_quantity, data.life_cycle_phase], (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    findAllProcess: (callback) => {
        const query = ` SELECT * FROM output_processes`;
        db.query(query, callback);
    },

    findByIdProcess: (id, callback) => {
        db.query('SELECT * FROM output_processes WHERE output_process_id     = ?', [id], callback);
    },

    updateByIdProcess: (id, data, callback) => {
        db.query('SELECT * FROM output_processes WHERE output_process_id   = ?', [id], (err, [process]) => {
            if (err || !process) return callback(err, process);

            const { process_id = process.process_id,
                output_cat_id = process.output_cat_id,
                output_name = process.output_name,
                output_unit = process.output_unit,
                output_quantity = process.output_quantity,
                life_cycle_phase = process.life_cycle_phase
            } = data;

            const sql = `  UPDATE output_processes SET process_id = ?,output_cat_id = ?, output_name = ?, output_unit = ?, output_quantity = ?, life_cycle_phase = ? WHERE output_process_id  = ? `;
            db.query(sql, [process_id, output_cat_id, output_name, output_unit, output_quantity, life_cycle_phase, id], callback);
        });
    },

    deleteByIdProcess: (id, callback) => {
        db.query('DELETE FROM output_processes WHERE output_process_id  = ?', [id], callback);
    }
};


module.exports = outputModel;

