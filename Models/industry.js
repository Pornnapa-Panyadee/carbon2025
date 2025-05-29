const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../Config/db.js');

const industryModel = {
    create: async (data, callback) => {
        try {
            const sql = `
            INSERT INTO industrials (industrial_name, required_cbam)
            VALUES (?, ?)
            `;
            db.query(sql, [
                data.industrial_name, data.required_cbam
            ], (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    findAll: (callback) => {
        const query = ` SELECT * FROM industrials`;
        db.query(query, callback);
    },

    findById: (industrial_id, callback) => {
        const sql = 'SELECT * FROM industrials WHERE industrial_id = ?';
        db.query(sql, [industrial_id], callback);
    },

    updateById: (industrial_id, data, callback) => {
        db.query('SELECT * FROM industrials WHERE industrial_id = ?', [industrial_id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(new Error('Auditor not found'));

            const industrial = results[0];

            const {
                industrial_name = industrial.industrial_name,
                required_cbam = industrial.required_cbam
            } = data;

            const sql = `
                UPDATE industrials SET industrial_name = ?, required_cbam = ?
                WHERE industrial_id = ?
            `;
            db.query(sql, [industrial_name, required_cbam, industrial_id], callback);
        });
    },

    deleteById: (industrial_id, callback) => {
        db.query('DELETE FROM industrials WHERE industrial_id = ?', [industrial_id], callback);
    }
};

module.exports = industryModel;