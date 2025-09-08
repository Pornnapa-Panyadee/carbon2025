const bcrypt = require('bcrypt');
const db = require('../Config/db.js');

const adminModel = {
    listRound: async () => {
        const query = 'SELECT * FROM rounds WHERE status = 1';
        const [result] = await db.query(query);
        return result;
    },
    createRound: async (data) => {
        const query = 'INSERT INTO rounds SET ?';
        const [result] = await db.query(query, data);
        return result;
    },
    listRoundId: async (id) => {
        const query = 'SELECT * FROM rounds WHERE id=?';
        const [result] = await db.query(query, [id]);
        return result[0];
    },
    updateRoundId: async (data) => {
        const { id, ...updateFields } = data; // แยก id ออก

        const query = 'UPDATE rounds SET ? WHERE id = ?';
        const [result] = await db.query(query, [updateFields, id]);

        return result;
    },
    deleteRoundId: async (id) => {
        const query = 'DELETE FROM rounds WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result; // ส่ง result กลับไปให้ controller จัดการ
    },
    // Unit
    listUnit: async () => {
        const query = 'SELECT * FROM units';
        const [result] = await db.query(query);
        return result;
    },
    createUnit: async (data) => {
        const query = 'INSERT INTO units SET ?';
        const [result] = await db.query(query, data);
        return result;
    },
    listUnitId: async (id) => {
        const query = 'SELECT * FROM units WHERE product_unit_id =?';
        const [result] = await db.query(query, [id]);
        return result[0];
    },
    updateUnitId: async (data) => {
        const { id, ...updateFields } = data; // แยก id ออก

        const query = 'UPDATE units SET ? WHERE product_unit_id  = ?';
        const [result] = await db.query(query, [updateFields, id]);

        return result;
    },
    deleteUnitId: async (id) => {
        const query = 'DELETE FROM units WHERE product_unit_id  = ?';
        const [result] = await db.query(query, [id]);
        return result; // ส่ง result กลับไปให้ controller จัดการ
    },
    // PCR
    listPCR: async () => {
        const query = 'SELECT * FROM pcrs';
        const [result] = await db.query(query);
        return result;
    },
    createPCR: async (data) => {
        const query = 'INSERT INTO pcrs SET ?';
        const [result] = await db.query(query, data);
        return result;
    },
    listPCRId: async (id) => {
        const query = 'SELECT * FROM pcrs WHERE id =?';
        const [result] = await db.query(query, [id]);
        return result[0];
    },
    updatePCRId: async (data) => {
        const { id, ...updateFields } = data; // แยก id ออก

        const query = 'UPDATE pcrs SET ? WHERE id  = ?';
        const [result] = await db.query(query, [updateFields, id]);

        return result;
    },
    deletePCRId: async (id) => {
        const query = 'DELETE FROM pcrs WHERE id  = ?';
        const [result] = await db.query(query, [id]);
        return result; // ส่ง result กลับไปให้ controller จัดการ
    },
    // Industrial
    listIndustrial: async () => {
        const query = 'SELECT * FROM industrials';
        const [result] = await db.query(query);
        return result;
    },
    createIndustrial: async (data) => {
        const query = 'INSERT INTO industrials SET ?';
        const [result] = await db.query(query, data);
        return result;
    },
    listIndustrialId: async (id) => {
        const query = 'SELECT * FROM industrials WHERE industrial_id =?';
        const [result] = await db.query(query, [id]);
        return result[0];
    },
    updateIndustrialId: async (data) => {
        const { id, ...updateFields } = data; // แยก id ออก

        const query = 'UPDATE industrials SET ? WHERE industrial_id  = ?';
        const [result] = await db.query(query, [updateFields, id]);

        return result;
    },
    deleteIndustrialId: async (id) => {
        const query = 'DELETE FROM industrials WHERE industrial_id  = ?';
        const [result] = await db.query(query, [id]);
        return result; // ส่ง result กลับไปให้ controller จัดการ
    },

    // TGOef
    listTGOef: async () => {
        const query = `
            SELECT  e.*, c.tgo_ef_cat_name, s.tgo_ef_subcat_name,  s.tgo_ef_cat_id
            FROM tgo_efs e
            JOIN tgo_ef_subcategories s ON e.tgo_ef_subcat_id = s.tgo_ef_subcat_id
            JOIN tgo_ef_categories c ON s.tgo_ef_cat_id = c.tgo_ef_cat_id
        `;
        const [result] = await db.query(query);
        return result;
    },
    createTGOef: async (data) => {
        const query = 'INSERT INTO tgo_efs SET ? , created_date= NOW(), updated_date= NOW()';
        const [result] = await db.query(query, data);
        return result;
    },
    listTGOefId: async (id) => {
        const query = `
            SELECT  e.*, c.tgo_ef_cat_name, s.tgo_ef_subcat_name,  s.tgo_ef_cat_id
            FROM tgo_efs e
            JOIN tgo_ef_subcategories s ON e.tgo_ef_subcat_id = s.tgo_ef_subcat_id
            JOIN tgo_ef_categories c ON s.tgo_ef_cat_id = c.tgo_ef_cat_id WHERE ef_id  =?
        `;

        const [result] = await db.query(query, [id]);
        return result[0];
    },
    updateTGOefId: async (data) => {
        const { id, ...updateFields } = data; // แยก id ออก

        const query = 'UPDATE tgo_efs SET ? WHERE ef_id   = ?';
        const [result] = await db.query(query, [updateFields, id]);

        return result;
    },
    deleteTGOefId: async (id) => {
        const query = 'DELETE FROM tgo_efs WHERE ef_id   = ?';
        const [result] = await db.query(query, [id]);
        return result; // ส่ง result กลับไปให้ controller จัดการ
    },
    listTGOefCategories: async () => {
        const query = 'SELECT * FROM tgo_ef_categories';
        const [result] = await db.query(query);
        return result;
    },
    listTGOefSubCategories: async () => {
        const query = ` SELECT  * FROM tgo_ef_subcategories`;
        const [result] = await db.query(query);
        return result;
    },

    // Dashboard
    // 1. Account Admin Detall
    // 2. Count Company Product Approved
    // 3. Company list detail name industrial type count product

    listDashboard: async () => {
        const querycompanies = `SELECT COUNT(*) AS total_companies FROM companies;`;
        const [totalCompaniesResult] = await db.query(querycompanies);
        const total_companies = totalCompaniesResult[0].total_companies;

        const queryproducts = `SELECT COUNT(*) AS total_products FROM products;`;
        const [totalProductsResult] = await db.query(queryproducts);
        const total_products = totalProductsResult[0].total_products;

        const query = `SELECT c.*,i.industrial_name, COUNT(p.product_id) AS product_count 
                   FROM companies c
                   LEFT JOIN products p ON c.company_id = p.company_id
                   LEFT JOIN industrials i ON c.industrial_id = i.industrial_id
                   GROUP BY c.company_id, c.name;`;
        const [companyList] = await db.query(query);

        const result = {
            company_total: total_companies,
            product_total: total_products,
            company_detail: companyList
        };

        return result;
    },

    listCompanies: async () => {
        const query = `
    SELECT c.company_id, c.name AS company_name, c.address, c.province_id, c.contact_no,
           c.industrial_id, c.district_id, c.subdistrict_id, c.zipcode,
           p.product_id, p.product_name_th, p.product_name_en, p.scope,
           p.FU_value, p.PU_value, p.sale_ratio, p.product_techinfo,
           p.verify_status, p.submitted_round, p.submitted_date
    FROM companies c
    LEFT JOIN products p ON c.company_id = p.company_id;
  `;

        const [rows] = await db.query(query);

        return Object.values(rows.reduce((acc, row) => {
            if (!acc[row.company_id]) {
                acc[row.company_id] = {
                    company_id: row.company_id,
                    company_name: row.company_name,
                    address: row.address,
                    province_id: row.province_id,
                    contact_no: row.contact_no,
                    industrial_id: row.industrial_id,
                    district_id: row.district_id,
                    subdistrict_id: row.subdistrict_id,
                    zipcode: row.zipcode,
                    products: []
                };
            }
            if (row.product_id) {
                acc[row.company_id].products.push({
                    product_id: row.product_id,
                    product_name_th: row.product_name_th,
                    product_name_en: row.product_name_en,
                    scope: row.scope,
                    FU_value: row.FU_value,
                    PU_value: row.PU_value,
                    sale_ratio: row.sale_ratio,
                    product_techinfo: row.product_techinfo,
                    verify_status: row.verify_status,
                    submitted_round: row.submitted_round,
                    submitted_date: row.submitted_date
                });
            }
            return acc;
        }, {}));
    },

    listCompanyId: async (companyId) => {
        const query = `
    SELECT c.company_id, c.name AS company_name, c.address, c.province_id, c.contact_no,
           c.industrial_id, c.district_id, c.subdistrict_id, c.zipcode,
           p.product_id, p.product_name_th, p.product_name_en, p.scope,
           p.FU_value, p.PU_value, p.sale_ratio, p.product_techinfo,
           p.verify_status, p.submitted_round, p.submitted_date
    FROM companies c
    LEFT JOIN products p ON c.company_id = p.company_id
    WHERE c.company_id = ?;
  `;

        const [rows] = await db.query(query, [companyId]);

        if (rows.length === 0) return null;

        const company = {
            company_id: rows[0].company_id,
            company_name: rows[0].company_name,
            address: rows[0].address,
            province_id: rows[0].province_id,
            contact_no: rows[0].contact_no,
            industrial_id: rows[0].industrial_id,
            district_id: rows[0].district_id,
            subdistrict_id: rows[0].subdistrict_id,
            zipcode: rows[0].zipcode,
            products: []
        };

        rows.forEach(row => {
            if (row.product_id) {
                company.products.push({
                    product_id: row.product_id,
                    product_name_th: row.product_name_th,
                    product_name_en: row.product_name_en,
                    scope: row.scope,
                    FU_value: row.FU_value,
                    PU_value: row.PU_value,
                    sale_ratio: row.sale_ratio,
                    product_techinfo: row.product_techinfo,
                    verify_status: row.verify_status,
                    submitted_round: row.submitted_round,
                    submitted_date: row.submitted_date
                });
            }
        });

        return company;
    },

    deleteCompanyId: async (companyId) => {
        try {
            // ลบ products ของบริษัทนี้ก่อน (ถ้าไม่มี CASCADE)
            await db.query("DELETE FROM products WHERE company_id = ?", [companyId]);

            // ลบ company
            const [result] = await db.query("DELETE FROM companies WHERE company_id = ?", [companyId]);

            return result.affectedRows > 0; // true = ลบได้, false = ไม่เจอ
        } catch (err) {
            console.error("Delete error:", err);
            throw err;
        }
    },
    // User
    createUser: async (data) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const query = 'INSERT INTO users SET ?';
        const [result] = await db.query(query, { ...data, password: hashedPassword });
        return result;
    },
    listUser: async () => {
        const query = 'SELECT * FROM users';
        const [rows] = await db.query(query);
        return rows;
    },
    readUserId: async (userId) => {
        const query = 'SELECT * FROM users WHERE user_id = ?';
        const [rows] = await db.query(query, [userId]);
        return rows[0] || null;
    },
    updateUserId: async (userId, data) => {
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
    deleteUserId: async (userId) => {
        const query = 'DELETE FROM users WHERE user_id = ?';
        const [result] = await db.query(query, [userId]);
        return result.affectedRows > 0;
    }
};

module.exports = adminModel;