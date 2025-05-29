const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../Config/db.js');


const companyModel = {
    create: async (data, callback) => {
        try {
            const sql = `
                INSERT INTO companies (
                    user_id, name, address, province_id, contact_no, industrial_id, created_date, updated_date
                ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;

            db.query(sql, [
                data.user_id, data.name,
                data.address, data.province_id,
                data.contact_no, data.industrial_id
            ], (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    findAll: (callback) => {
        const query = ` SELECT * FROM companies`;
        db.query(query, callback);
    },

    finconnectDById: (id, callback) => {
        db.query('SELECT * FROM companies WHERE company_id  = ?', [id], callback);
    },

    updateById: (id, data, callback) => {
        db.query('SELECT * FROM companies WHERE company_id = ?', [id], (err, [company]) => {
            if (err || !company) return callback(err, company);

            const {
                user_id = company.user_id,
                name = company.name,
                address = company.address,
                province_id = company.province_id,
                contact_no = company.contact_no,
                industrial_id = company.industrial_id
            } = data;

            const sql = `
                UPDATE companies SET user_id = ?, name = ?, address = ?, province_id = ?, contact_no = ?, industrial_id = ?, updated_date = NOW()
                WHERE company_id = ?
            `;
            db.query(sql, [user_id, name, address, province_id, contact_no, industrial_id, id], callback);
        });
    },

    deleteById: (company_id, callback) => {
        db.query('DELETE FROM companies WHERE company_id = ?', [company_id], callback);
    }
};


module.exports = companyModel;

