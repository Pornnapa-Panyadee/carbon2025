const db = require('../Config/db.js');
const path = require('path');
const fs = require('fs').promises;

const productModel = {
    create: async (data, file) => {
        let photoPath = null;

        if (file && file.originalname && file.buffer) {
            const filename = `${Date.now()}_${file.originalname}`;
            const relativePath = path.join('public', 'product', filename);
            const uploadPath = path.join(__dirname, '..', relativePath);

            await fs.mkdir(path.dirname(uploadPath), { recursive: true });
            await fs.writeFile(uploadPath, file.buffer);
            photoPath = relativePath.replace(/\\/g, '/');
        }

        const sql = `
            INSERT INTO products (
                company_id, product_name_th, product_name_en, scope, FU_value, FU_th, FU_en,
                PU_value, PU_th, PU_en, sale_ratio, product_techinfo, pcr_reference,
                collect_data_start, collect_data_end, product_photo, auditor_id,
                verify_status, submitted_round, submitted_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            data.company_id, data.product_name_th, data.product_name_en, data.scope,
            data.FU_value, data.FU_th, data.FU_en,
            data.PU_value, data.PU_th, data.PU_en,
            data.sale_ratio, data.product_techinfo, data.pcr_reference,
            data.collect_data_start, data.collect_data_end,
            photoPath, data.auditor_id,
            data.verify_status, data.submitted_round,
            data.submitted_date
        ];

        const [results] = await db.query(sql, values);
        return results;
    },

    findAll: async () => {
        const [results] = await db.query('SELECT * FROM products');
        return results;
    },

    findById: async (product_id) => {
        const [results] = await db.query('SELECT * FROM products WHERE product_id = ?', [product_id]);
        return results;
    },

    updateById: async (product_id, data, file) => {
        const [existingRows] = await db.query('SELECT * FROM products WHERE product_id = ?', [product_id]);
        const existingProduct = existingRows[0];
        if (!existingProduct) throw new Error('Product not found');

        let photoPath = existingProduct.product_photo;

        if (file && file.originalname && file.buffer) {
            const filename = `${Date.now()}_${file.originalname}`;
            const relativePath = path.join('public', 'product', filename);
            const uploadPath = path.join(__dirname, '..', relativePath);

            await fs.mkdir(path.dirname(uploadPath), { recursive: true });
            await fs.writeFile(uploadPath, file.buffer);
            photoPath = relativePath.replace(/\\/g, '/');
        }

        const {
            company_id = existingProduct.company_id,
            product_name_th = existingProduct.product_name_th,
            product_name_en = existingProduct.product_name_en,
            scope = existingProduct.scope,
            FU_value = existingProduct.FU_value,
            FU_th = existingProduct.FU_th,
            FU_en = existingProduct.FU_en,
            PU_value = existingProduct.PU_value,
            PU_th = existingProduct.PU_th,
            PU_en = existingProduct.PU_en,
            product_techinfo = existingProduct.product_techinfo,
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
                company_id = ?, product_name_th = ?, product_name_en = ?, scope = ?,
                FU_value = ?, FU_th = ?, FU_en = ?, PU_value = ?, PU_th = ?, PU_en = ?,
                product_techinfo = ?, sale_ratio = ?, pcr_reference = ?, collect_data_start = ?, collect_data_end = ?,
                product_photo = ?, auditor_id = ?, verify_status = ?, submitted_round = ?, submitted_date = ?
            WHERE product_id = ?
        `;

        const values = [
            company_id, product_name_th, product_name_en, scope,
            FU_value, FU_th, FU_en, PU_value, PU_th, PU_en,
            product_techinfo, sale_ratio, pcr_reference, collect_data_start, collect_data_end,
            photoPath, auditor_id, verify_status, submitted_round, submitted_date,
            product_id
        ];

        const [results] = await db.query(sql, values);
        return { message: 'Product updated successfully', results };
    },

    deleteById: async (product_id) => {
        const [results] = await db.query('DELETE FROM products WHERE product_id = ?', [product_id]);
        return results;
    }
};

module.exports = productModel;
