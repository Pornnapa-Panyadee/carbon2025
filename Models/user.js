const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../Config/db.js');


const userModel = {
    create: async (data, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10); // 🔒 hash password
            const sql = 'INSERT INTO users (name, email, password, role_id, status, created_date, updated_date) VALUES(?, ?, ?, ?, ?, NOW(), NOW()) ';

            db.query(sql, [data.name, data.email, hashedPassword, data.role_id, data.status || 'enable'], (err, results) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results);
            });
        } catch (err) {
            callback(err);
        }
    },

    findAll: (callback) => {
        const query = 'SELECT user_id, name, email, role_id, status, created_date, updated_date FROM users';
        db.query(query, callback);
    },

    finconnectDById: (id, callback) => {
        db.query('SELECT * FROM users WHERE user_id = ?', [id], callback);
    },

    updateById: async function (user_id, data, callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback is not a function');
        }
        try {
            db.query('SELECT * FROM users WHERE user_id = ?', [user_id], async (err, results) => {
                if (err) return callback(err);
                if (results.length === 0) return callback(null, null);

                const user = results[0];
                const updatedName = data.name ?? user.name;
                const updatedEmail = data.email ?? user.email;
                const updatedStatus = data.status ?? user.status;

                let updatedPassword = user.password;
                if (data.password) {
                    updatedPassword = await bcrypt.hash(data.password, 10);
                }

                const updateQuery = `
                UPDATE users
                SET name = ?, email = ?, password = ?, status = ?, updated_date = NOW()
                WHERE user_id = ?
            `;
                db.query(updateQuery, [updatedName, updatedEmail, updatedPassword, updatedStatus, user_id], callback);
            });
        } catch (err) {
            callback(err);
        }
    },

    deleteById: (user_id, callback) => {
        db.query('DELETE FROM users  WHERE user_id = ?', [user_id], callback);
    }
};


module.exports = userModel;

