const db = require('../Config/db.js');


const processModel = {
    create: async (data, callback) => {
        try {
            const sql = `
                INSERT INTO processes (
                    product_id , pre_process_id, post_process_id, process_name, mass_balanced, created_date, updated_date
                ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())
            `;

            db.query(sql, [
                data.product_id, data.pre_process_id,
                data.post_process_id, data.process_name,
                data.mass_balanced
            ], (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    findAll: (callback) => {
        const query = ` SELECT * FROM processes`;
        db.query(query, callback);
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM processes WHERE process_id   = ?', [id], callback);
    },

    updateById: (id, data, callback) => {
        db.query('SELECT * FROM processes WHERE process_id = ?', [id], (err, results) => {
            if (err || !results || results.length === 0) return callback(err || new Error('Process not found'));

            const process = results[0]; // Safely get the first row

            const {
                product_id = process.product_id,
                ordering = process.ordering,
                process_name = process.process_name,
                mass_balanced = process.mass_balanced
            } = data;

            const sql = `
                UPDATE processes SET product_id = ?, ordering = ? , process_name = ?, mass_balanced = ?,  updated_date = NOW()
                WHERE process_id = ?
            `;
            db.query(sql, [product_id, ordering, process_name, mass_balanced, id], callback);
        });
    },

    deleteById: (id, callback) => {
        db.query('DELETE FROM processes WHERE process_id = ?', [id], callback);
    }
};


module.exports = processModel;

