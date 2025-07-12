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
    },

    readAuditorReportID: async (auditor_id) => {
        const sql1 = `SELECT * FROM products WHERE auditor_id = ?`;
        const sql2 = `SELECT * FROM auditors WHERE auditor_id = ?`;
        const sql3 = `SELECT * FROM auditor_status WHERE auditor_id = ?`;

        const [products] = await db.query(sql1, [auditor_id]);
        const [auditor] = await db.query(sql2, [auditor_id]);
        const [statuses] = await db.query(sql3, [auditor_id]);

        // สร้าง Map product_id => status
        const statusMap = new Map();
        for (const s of statuses) {
            statusMap.set(s.product_id, s.status);
        }

        // รวม status เข้ากับแต่ละ product
        const productsWithStatus = products.map(p => ({
            ...p,
            products_status: statusMap.get(p.product_id) ?? null
        }));

        // แยกกลุ่มตาม status
        const grouped = {};
        for (const p of productsWithStatus) {
            const status = p.products_status;
            if (!grouped[status]) {
                grouped[status] = [];
            }
            grouped[status].push(p);
        }

        // สร้าง array ในรูปแบบที่ต้องการ
        const groupedProducts = Object.entries(grouped).map(([status, items]) => ({
            products_status: parseInt(status),
            items
        }));

        return {
            auditor_id,
            auditor: auditor[0] || null,
            products: groupedProducts
        };
    },
    createComment: async (data) => {
        const query = 'INSERT INTO auditor_comments SET ?, created_at = NOW(), updated_at = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },

    listComments: async (comments_id) => {
        const query = 'SELECT * FROM auditor_comments WHERE comments_id = ?';
        const [rows] = await db.query(query, [comments_id]);
        return rows[0];
    },
    updateComment: async (comments_id, data) => {
        const query = 'UPDATE auditor_comments SET ?, updated_date = NOW() WHERE comments_id = ?';
        const [result] = await db.query(query, [data, comments_id]);
        return result;
    },
    deleteComment: async (comments_id) => {
        const query = 'DELETE FROM auditor_comments WHERE comments_id = ?';
        const [result] = await db.query(query, [comments_id]);
        return result;
    },
    readAuditorProductDetails: async (auditor_id, product_id) => {
        const sql1 = `SELECT * FROM products WHERE auditor_id = ? AND product_id = ?`;
        const sql2 = `SELECT * FROM auditors WHERE auditor_id = ?`;
        const sql3 = `SELECT * FROM auditor_status WHERE auditor_id = ? AND product_id = ?`;
        const sql4 = `SELECT * FROM auditor_comments WHERE auditor_id = ? AND product_id = ? ORDER BY created_at DESC`;

        // Query data
        const [products] = await db.query(sql1, [auditor_id, product_id]);
        const [auditor] = await db.query(sql2, [auditor_id]);
        const [statuses] = await db.query(sql3, [auditor_id, product_id]);
        const [comments] = await db.query(sql4, [auditor_id, product_id]);

        if (products.length === 0) {
            throw new Error('Product not found for this auditor');
        }

        return {
            auditor_id,
            auditor: auditor[0] || null,
            product: products[0],
            status: statuses[0] || null,
            comments: comments || []
        };
    },

    updateStatusProduct: async (auditor_id, product_id, status_id, newStatus) => {
        const sql = `
        UPDATE auditor_status
        SET status = ?, updated_at = NOW()
        WHERE auditor_id = ? AND product_id = ? AND status_id = ?
    `;
        const [result] = await db.query(sql, [newStatus, auditor_id, product_id, status_id]);
        return result;
    },
};

module.exports = auditorModel;