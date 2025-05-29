const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../Config/db.js');

const auditorModel = {
    create: async (data, callback) => {
        try {
            const sql = `
                INSERT INTO auditors (
                    user_id, name, register_id, description, created_date, updated_date
                ) VALUES (?, ?, ?, ?,  NOW(), NOW())
            `;

            db.query(sql, [
                data.user_id, data.name,
                data.register_id, data.description
            ], (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    findAll: (callback) => {
        const query = ` SELECT * FROM auditors`;
        db.query(query, callback);
    },

    findById: (auditor_id, callback) => {
        const sql = 'SELECT * FROM auditors WHERE auditor_id = ?';
        db.query(sql, [auditor_id], callback);
    },

    updateById: (auditor_id, data, callback) => {
        db.query('SELECT * FROM auditors WHERE auditor_id = ?', [auditor_id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(new Error('Auditor not found'));

            const auditor = results[0];

            const {
                user_id = auditor.user_id,
                name = auditor.name,
                register_id = auditor.register_id,
                description = auditor.description
            } = data;

            const sql = `
                UPDATE auditors SET user_id = ?, name = ?, register_id = ?, description = ?, updated_date = NOW()
                WHERE auditor_id = ?
            `;
            db.query(sql, [user_id, name, register_id, description, auditor_id], callback);
        });
    },

    deleteById: (auditor_id, callback) => {
        db.query('DELETE FROM auditors WHERE auditor_id = ?', [auditor_id], callback);
    }
};

module.exports = auditorModel;