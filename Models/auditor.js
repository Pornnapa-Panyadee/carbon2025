const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../Config/db.js');

const auditorModel = {
    create: async (data) => {
        const sql = `
            INSERT INTO auditors (
                user_id, name, register_id, description, created_date, updated_date
            ) VALUES (?, ?, ?, ?, NOW(), NOW())
        `;
        const [results] = await db.query(sql, [
            data.user_id, data.name,
            data.register_id, data.description
        ]);
        return results;
    },

    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM auditors');
        return rows;
    },

    findById: async (auditor_id) => {
        const [rows] = await db.query('SELECT * FROM auditors WHERE auditor_id = ?', [auditor_id]);
        return rows[0] || null;
    },

    updateById: async (auditor_id, data) => {
        const [rows] = await db.query('SELECT * FROM auditors WHERE auditor_id = ?', [auditor_id]);
        if (!rows || rows.length === 0) throw new Error('Auditor not found');

        const auditor = rows[0];
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
        const [result] = await db.query(sql, [user_id, name, register_id, description, auditor_id]);
        return result;
    },

    deleteById: async (auditor_id) => {
        const [result] = await db.query('DELETE FROM auditors WHERE auditor_id = ?', [auditor_id]);
        return result;
    }
};

module.exports = auditorModel;