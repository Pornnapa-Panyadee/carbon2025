const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../Config/db.js');

const companyModel = {
    create: async (data) => {
        const sql = `
            INSERT INTO companies (
                user_id, name, address, province_id, contact_no, industrial_id, created_date, updated_date
            ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const [results] = await db.query(sql, [
            data.user_id, data.name,
            data.address, data.province_id,
            data.contact_no, data.industrial_id
        ]);
        return results;
    },

    findAll: async () => {
        const [rows] = await db.query(`SELECT * FROM companies`);
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM companies WHERE company_id = ?', [id]);
        return rows[0] || null;
    },

    updateById: async (id, data) => {
        const [rows] = await db.query('SELECT * FROM companies WHERE company_id = ?', [id]);
        if (!rows || rows.length === 0) throw new Error('Company not found');
        const company = rows[0];

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
        const [result] = await db.query(sql, [user_id, name, address, province_id, contact_no, industrial_id, id]);
        return result;
    },

    deleteById: async (company_id) => {
        const [result] = await db.query('DELETE FROM companies WHERE company_id = ?', [company_id]);
        return result;
    },
    findByUserId: async (user_id) => {
        const [rows] = await db.query('SELECT * FROM companies WHERE user_id = ?', [user_id]);
        return rows || [];
    },

};

module.exports = companyModel;

