const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        const query = `
            INSERT INTO reports 
            SET ?, 
            created_at = NOW(), 
            updated_at = NOW()
        `;
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const query = 'UPDATE reports SET ? WHERE id = ?';
        const [result] = await db.query(query, [data, data.id]);
        return result;
    },
    readperID: async (id) => {
        const query = `
            SELECT 
                r.*, 
                i.name AS installation_name,
                v.name AS verifier_name,
                it.name AS industry_type_name,
                gc.name AS goods_category_name,
                cn.name AS name
            FROM reports r
            LEFT JOIN installations i ON r.installation_id = i.id
            LEFT JOIN verifiers v ON r.verifier_id = v.id
            LEFT JOIN industry_types it ON r.industry_type_id = it.industry_id
            LEFT JOIN goods_categories gc ON r.goods_id = gc.goods_id
            LEFT JOIN cn_codes cn ON r.cn_id = cn.cn_id
            WHERE r.id = ?
        `;
        const [result] = await db.query(query, [id]);
        return result;
    },

    readperIDuser: async (id) => {

        const query = `
            SELECT 
                r.*, 
                i.name AS installation_name,
                v.name AS verifier_name,
                it.name AS industry_type_name,
                gc.name AS goods_category_name,
                cn.name AS name,
                cn.cn_code AS cncode

            FROM reports r
            LEFT JOIN installations i ON r.installation_id = i.id
            LEFT JOIN verifiers v ON r.verifier_id = v.id
            LEFT JOIN industry_types it ON r.industry_type_id = it.industry_id
            LEFT JOIN goods_categories gc ON r.goods_id = gc.goods_id
            LEFT JOIN cn_codes cn ON r.cn_id = cn.cn_id
            WHERE r.company_id = ?
        `;

        const [result] = await db.query(query, [id]);
        return result;
    },

    deleteById: async (id) => {
        const query = 'DELETE FROM reports WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    }

};

module.exports = Report;