const db = require('../Config/db.js');
const path = require('path');
const fs = require('fs').promises;

const productyModel = {
    create: async (data, file, callback) => {
        try {
            let photoPath = null;

            // จัดการรูปภาพหากมีการอัปโหลด
            if (file && file.originalname && file.buffer) {
                const filename = `${Date.now()}_${file.originalname}`;
                const relativePath = path.join('public', 'product', filename);
                const uploadPath = path.join(__dirname, '..', relativePath);

                // สร้างโฟลเดอร์หากยังไม่มี
                await fs.mkdir(path.dirname(uploadPath), { recursive: true });
                await fs.writeFile(uploadPath, file.buffer);
                photoPath = relativePath.replace(/\\/g, '/'); // ปรับ path สำหรับ cross-platform
            }

            const sql = `
                INSERT INTO products (
                    company_id, product_name_th, product_name_en, scope, FU_th, FU_en,
                    sale_ratio, pcr_reference, collect_data_start, collect_data_end,
                    product_photo, auditor_id, verify_status, submitted_round, submitted_date
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                data.company_id, data.product_name_th,
                data.product_name_en, data.scope,
                data.FU_th, data.FU_en,
                data.sale_ratio, data.pcr_reference,
                data.collect_data_start, data.collect_data_end,
                photoPath, data.auditor_id,
                data.verify_status, data.submitted_round,
                data.submitted_date
            ];

            db.query(sql, values, (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            });

        } catch (err) {
            callback(err);
        }
    },

    findAll: (callback) => {
        const query = ` SELECT * FROM products`;
        db.query(query, callback);
    },

    findById: (product_id, callback) => {
        const sql = 'SELECT * FROM products WHERE product_id = ?';
        db.query(sql, [product_id], callback);
    },

    updateById: (product_id, data, file, callback) => {
        db.query('SELECT * FROM products WHERE product_id = ?', [product_id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(new Error('Product not found'));

            const existingProduct = results[0];
            let photoPath = existingProduct.product_photo;

            // จัดการรูปภาพหากมีการอัปโหลด
            if (file && file.originalname && file.buffer) {
                const filename = `${Date.now()}_${file.originalname}`;
                const relativePath = path.join('public', 'product', filename);
                const uploadPath = path.join(__dirname, '..', relativePath);

                fs.mkdir(path.dirname(uploadPath), { recursive: true }, (mkdirErr) => {
                    if (mkdirErr) return callback(mkdirErr);

                    fs.writeFile(uploadPath, file.buffer, (writeErr) => {
                        if (writeErr) return callback(writeErr);

                        photoPath = relativePath.replace(/\\/g, '/');
                        continueUpdate(); // ไปอัปเดตข้อมูลหลังจากอัปโหลดไฟล์เสร็จ
                    });
                });
            } else {
                continueUpdate(); // ไม่มีไฟล์แนบก็อัปเดตได้เลย
            }

            function continueUpdate() {
                const {
                    company_id = existingProduct.company_id,
                    product_name_th = existingProduct.product_name_th,
                    product_name_en = existingProduct.product_name_en,
                    scope = existingProduct.scope,
                    FU_th = existingProduct.FU_th,
                    FU_en = existingProduct.FU_en,
                    sale_ratio = existingProduct.sale_ratio,
                    pcr_reference = existingProduct.pcr_reference,
                    collect_data_start = existingProduct.collect_data_start,
                    collect_data_end = existingProduct.collect_data_end,
                    auditor_id = existingProduct.auditor_id,
                    verify_status = existingProduct.verify_status,
                    submitted_round = existingProduct.submitted_round,
                    submitted_date = existingProduct.submitted_date
                } = data;

                const sql = `
                    UPDATE products SET
                        company_id = ?, product_name_th = ?, product_name_en = ?, scope = ?, FU_th = ?, FU_en = ?,
                        sale_ratio = ?, pcr_reference = ?, collect_data_start = ?, collect_data_end = ?,
                        product_photo = ?, auditor_id = ?, verify_status = ?, submitted_round = ?, submitted_date = ?
                    WHERE product_id = ?
                `;

                const values = [
                    company_id, product_name_th, product_name_en, scope, FU_th, FU_en,
                    sale_ratio, pcr_reference, collect_data_start, collect_data_end,
                    photoPath, auditor_id, verify_status, submitted_round, submitted_date,
                    product_id
                ];

                db.query(sql, values, (updateErr, updateResults) => {
                    if (updateErr) return callback(updateErr);
                    callback(null, { message: 'Product updated successfully', results: updateResults });
                });
            }
        });
    },

    deleteById: (product_id, callback) => {
        db.query('DELETE FROM products WHERE product_id = ?', [product_id], callback);
    }
};

module.exports = productyModel;