const db = require('../Config/db.js');
const path = require('path');
const fs = require('fs').promises;

const productModel = {
    create: async (data, file) => {
        let photoPath = null;

        if (file && file.originalname && file.buffer) {
            const filename = `${Date.now()}_${file.originalname}`;
            const relativePath = path.join('Public', 'product', filename);
            const uploadPath = path.join(__dirname, '..', relativePath);

            await fs.mkdir(path.dirname(uploadPath), { recursive: true });
            await fs.writeFile(uploadPath, file.buffer);
            photoPath = relativePath.replace(/\\/g, '/');
        }

        const sql = 'INSERT INTO products SET ?, created_date = NOW(), updated_date = NOW()';

        const [results] = await db.query(sql, {
            ...data,
            product_photo: photoPath
        });

        const product_id = results.insertId; // ✅ เก็บ product_id จากตรงนี้

        const auditorstatusSql = `
            INSERT INTO auditor_status 
            SET auditor_id = ?, company_id = ?, product_id = ?, status = ?, created_at = NOW(), updated_at = NOW()
        `;

        await db.query(auditorstatusSql, [
            data.auditor_id,
            data.company_id,
            product_id,
            0 // หรือจะใช้ status_id ก็ได้ ถ้าค่ามันคือ 0
        ]);

        const c3 = 'INSERT INTO processes SET ?, created_date = NOW(), updated_date = NOW() ';
        const [processC3] = await db.query(c3, {
            product_id: product_id,
            ordering: 97,
            process_name: 'การกระจายสินค้า',
            mass_balanced: 0
        });
        const c4 = 'INSERT INTO processes SET ?, created_date = NOW(), updated_date = NOW() ';
        const [processC4] = await db.query(c4, {
            product_id: product_id,
            ordering: 98,
            process_name: 'การใช้งาน',
            mass_balanced: 0
        });
        const c5 = 'INSERT INTO processes SET ?, created_date = NOW(), updated_date = NOW() ';
        const [processC5] = await db.query(c5, {
            product_id: product_id,
            ordering: 99,
            process_name: 'การจัดการซาก',
            mass_balanced: 0
        });

        results.processC3 = processC3;
        results.processC4 = processC4;
        results.processC5 = processC5;
        return results;
    },

    findAll: async () => {
        const [results] = await db.query('SELECT * FROM products');
        // Add photo_name by extracting the filename from product_photo
        results.forEach(product => {
            if (product.product_photo) {
                product.photo_name = path.basename(product.product_photo);
            } else {
                product.photo_name = null;
            }
        });
        // Add photo_name and photo_path by extracting the filename from product_photo
        results.forEach(product => {
            if (product.product_photo) {
                product.photo_name = path.basename(product.product_photo);
                product.photo_path = `/product/image/${product.photo_name}`;
            } else {
                product.photo_name = null;
                product.photo_path = null;
            }
        });
        return results;
    },

    findById: async (product_id) => {
        const [results] = await db.query(`
            SELECT p.*, a.name AS editor_name
            FROM products p
            LEFT JOIN auditors a ON p.auditor_id = a.auditor_id
            WHERE p.product_id = ?
        `, [product_id]);
        if (results[0] && typeof results[0].product_techinfo === 'string') {
            try {
                results[0].product_techinfo_array = JSON.parse(results[0].product_techinfo);
            } catch {
                results[0].product_techinfo_array = [];
            }
        }
        // Add photo_name and photo_path for findById as well
        if (results[0] && results[0].product_photo) {
            results[0].photo_name = path.basename(results[0].product_photo);
            results[0].photo_path = `/product/image/${results[0].photo_name}`;
        } else if (results[0]) {
            results[0].photo_name = null;
            results[0].photo_path = null;
        }
        return results[0];
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
    },


};

module.exports = productModel;
