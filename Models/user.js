const bcrypt = require('bcrypt');
const db = require('../Config/db.js');

const userModel = {
    create: async (data) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const sql = `
            INSERT INTO users (name, email, password, role_id, status, created_date, updated_date)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const [result] = await db.query(sql, [
            data.name,
            data.email,
            hashedPassword,
            data.role_id,
            data.status || 'enable'
        ]);
        return result;
    },

    findAll: async () => {
        const [rows] = await db.query('SELECT user_id, name, email, role_id, status, created_date, updated_date FROM users');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
        return rows[0] || null;
    },

    updateById: async (user_id, data) => {
        const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
        if (rows.length === 0) return null;

        const user = rows[0];
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
        const [result] = await db.query(updateQuery, [
            updatedName,
            updatedEmail,
            updatedPassword,
            updatedStatus,
            user_id
        ]);
        return result;
    },

    deleteById: async (user_id) => {
        const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [user_id]);
        return result;
    }
};

module.exports = userModel;
