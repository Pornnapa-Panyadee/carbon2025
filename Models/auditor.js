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
        const sql1 = `SELECT * FROM products WHERE auditor_id = ? AND verify_status != ?`;
        const sql2 = `SELECT * FROM auditors WHERE auditor_id = ?`;
        const sql3 = `SELECT * FROM auditor_status WHERE auditor_id = ?`;

        const [products] = await db.query(sql1, [auditor_id, "Draft"],);
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
    createComment: async (data, create_by) => {
        const excel_old_query = `SELECT id FROM auditor_excel_paths WHERE auditor_id = ? AND product_id = ? ORDER BY id DESC LIMIT 1`;
        const [excel_old_rows] = await db.query(excel_old_query, [data.auditor_id, data.product_id]);
        const excel_id = excel_old_rows.length > 0 ? excel_old_rows[0].id : null;

        const productQuery = 'SELECT product_name_th FROM products WHERE product_id = ?';
        const [rows] = await db.query(productQuery, [data.product_id]);
        const product_name = rows[0]?.product_name_th || "ผลิตภัณฑ์ที่ไม่ทราบชื่อ";
        const message_alert = `ผู้ทวนสอบได้ระบุประเด็นที่ต้องปรับปรุงในผลิตภัณฑ์${product_name} ของคุณ`;

        const query = `
        INSERT INTO auditor_comments 
            (auditor_id, company_id, product_id, comment, excel_old_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
        const [result] = await db.query(query, [
            data.auditor_id,
            data.company_id,
            data.product_id,
            data.comment,
            excel_id
        ]);

        const product = 'UPDATE products SET verify_status = "Under" WHERE product_id = ?';
        await db.query(product, [data.product_id]);

        const notificationData = {
            auditor_id: data.auditor_id,
            company_id: data.company_id,
            product_id: data.product_id,
            comments_id: result.insertId,
            is_read: 0,
            message_alert,
            create_by
        };

        const notificationQuery = 'INSERT INTO notifications SET ?, created_at = NOW(), updated_at = NOW()';
        const [notificationResult] = await db.query(notificationQuery, notificationData);

        if (notificationResult.affectedRows === 0) {
            throw new Error('Failed to create notification');
        }

        return result;
    },


    listComments: async (comments_id) => {
        const query = 'SELECT * FROM auditor_comments WHERE comments_id = ?';
        const [rows] = await db.query(query, [comments_id]);
        return rows[0];
    },
    updateComment: async (comments_id, data) => {

        const sql = 'SELECT * FROM auditor_comments WHERE comments_id = ?';
        const [rows] = await db.query(sql, [comments_id]);
        if (rows.length === 0) {
            throw new Error(`ไม่พบความคิดเห็น comments_id = ${comments_id}`);
        }


        const excel_old_query = `
        SELECT id 
        FROM auditor_excel_paths 
        WHERE auditor_id = ? AND product_id = ? 
        ORDER BY id DESC `;
        const [excel_old_rows] = await db.query(excel_old_query, [rows[0].auditor_id, rows[0].product_id]);
        const excel_id = excel_old_rows.length > 0 ? excel_old_rows[0].id : null;

        // console.log('excel_id:', excel_id);
        // console.log('auditor_id:', rows[0].auditor_id,);
        // console.log('product_id:', rows[0].product_id);

        const query = `
        UPDATE auditor_comments 
        SET 
            comment_company = ?, 
            updated_at_company = NOW(),
            created_at_company = CASE 
                WHEN created_at_company IS NULL THEN NOW() 
                ELSE created_at_company 
            END,
            excel_new_id = ?
        WHERE comments_id = ?`;

        const [result] = await db.query(query, [data.comment_company, excel_id, comments_id]);

        if (result.affectedRows === 0) {
            throw new Error(`Update comment ไม่สำเร็จ: comments_id = ${comments_id}`);
        }



        const [companyRows] = await db.query('SELECT name FROM companies WHERE company_id  = ?', [rows[0].company_id]);
        const company_name = companyRows[0]?.name || 'ไม่ทราบชื่อบริษัท';

        const [productRows] = await db.query('SELECT product_name_th FROM products WHERE product_id  = ?', [rows[0].product_id]);
        const product_name = productRows[0]?.product_name_th || 'ไม่ทราบชื่อผลิตภัณฑ์';

        const product = 'UPDATE products SET verify_status = "Pending" WHERE product_id = ?';
        await db.query(product, [data.product_id]);

        const notificationData = {
            auditor_id: rows[0].auditor_id,
            company_id: rows[0].company_id,
            product_id: rows[0].product_id,
            comments_id: comments_id,
            is_read: 0,
            message_alert: `สถานประกอบการ ${company_name} ได้ตอบกลับประเด็นของคุณในผลิตภัณฑ์ ${product_name}`,
            create_by: "company"
        };

        const notificationQuery = 'INSERT INTO notifications SET ?, created_at = NOW(), updated_at = NOW() ';
        const [notificationResult] = await db.query(notificationQuery, notificationData);

        if (notificationResult.affectedRows === 0) {
            throw new Error('Failed to create notification');
        }

        return result;
    },
    deleteComment: async (comments_id) => {
        const query = 'DELETE FROM auditor_comments WHERE comments_id = ?';
        const [result] = await db.query(query, [comments_id]);
        return result;
    },
    readAuditorProductDetails: async (auditor_id, product_id) => {
        const sql1 = `SELECT * FROM products WHERE auditor_id = ? AND product_id = ? `;
        const sql2 = `SELECT * FROM auditors WHERE auditor_id = ?`;
        const sql3 = `SELECT * FROM auditor_status WHERE auditor_id = ? AND product_id = ?`;
        const sql4 = `
                SELECT 
                c.comments_id,
                c.auditor_id,
                c.company_id,
                c.product_id,
                c.comment,
                c.created_at,
                c.updated_at,
                c.comment_company,
                c.updated_at_company,
                c.created_at_company,
                c.excel_old_id,
                old_excel.path_excel AS old_excel_path,
                c.excel_new_id,
                new_excel.path_excel AS new_excel_path
                FROM auditor_comments AS c
                LEFT JOIN auditor_excel_paths AS old_excel 
                ON c.excel_old_id = old_excel.id
                LEFT JOIN auditor_excel_paths AS new_excel 
                ON c.excel_new_id = new_excel.id
                WHERE c.auditor_id = ? AND c.product_id = ?
                ORDER BY c.created_at DESC
                `;

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
            product: products,
            status: statuses[0] || null,
            comments: comments || [],

        };
    },

    updateStatusProduct: async (auditor_id, product_id, status_id, newStatus) => {
        const sql = ` UPDATE auditor_status SET status = ?, updated_at = NOW() WHERE auditor_id = ? AND product_id = ? AND status_id = ?`;
        const sql1 = `SELECT status_eng FROM auditors_status_infos WHERE status_id = ?`;
        const productSql = ` UPDATE products SET  verify_status = ?, updated_date = NOW() WHERE product_id = ? `;


        const [result] = await db.query(sql, [newStatus, auditor_id, product_id, status_id]);
        const [resultStatus] = await db.query(sql1, [status_id]);
        const statusInfo = resultStatus[0] ? resultStatus[0].status_eng : null;

        await db.query(productSql, [newStatus, product_id]);

        // ดึงชื่อผลิตภัณฑ์
        const [productRows] = await db.query('SELECT product_name_th, company_id  FROM products WHERE product_id  = ?', [product_id]);
        const product_name = productRows[0]?.product_name_th || 'ไม่ทราบชื่อผลิตภัณฑ์';
        const company_id = productRows[0]?.company_id || 'ไม่ทราบชื่อผลิตภัณฑ์';


        // แยกเฉพาะข้อมูลที่ต้องใช้ใน notifications
        const notificationData = {
            auditor_id: auditor_id,
            company_id: company_id,
            product_id: product_id,
            is_read: 0,
            message_alert: `ผลิตภัณฑ์${product_name} ของคุณได้รับการอนุมัติแบบฟอร์ม CFP โดยผู้ทวนสอบแล้ว`,
            create_by: "auditer"
        };

        const notificationQuery = 'INSERT INTO notifications SET ?, created_at = NOW(), updated_at = NOW() ';
        const [notificationResult] = await db.query(notificationQuery, notificationData);

        if (notificationResult.affectedRows === 0) {
            throw new Error('Failed to create notification');
        }


        return { result, statusInfo };
    },
};

module.exports = auditorModel;