const db = require('../Config/db.js');

const tgoModel = {
    findAlltgo: async () => {
        const [rows] = await db.query(`SELECT * FROM tgo_efs`);
        return rows;
    },

    findcat: async () => {
        const [rows] = await db.query(`SELECT * FROM tgo_ef_categories`);
        return rows;
    },

    findsubcat: async (tgo_ef_cat_id) => {
        const [category] = await db.query(`SELECT tgo_ef_cat_id  FROM  tgo_ef_categories WHERE tgo_ef_cat_id  = ?`, [tgo_ef_cat_id]);
        if (!category.length) return [];
        const categoryId = category[0].tgo_ef_cat_id;
        const [subcategories] = await db.query(`SELECT * FROM tgo_ef_subcategories WHERE tgo_ef_cat_id = ?`, [categoryId]);
        return subcategories;
    },

    findEachcat: async (tgo_ef_cat_id, tgo_ef_subcat_id) => {
        // ตรงนี้ tgo_ef_cat_id ถูกใช้เป็นชื่อ (name) ไม่ใช่ id
        // ถ้า route ส่ง id มา ต้องแก้ query ให้ใช้ id แทน name
        const [category] = await db.query(`SELECT tgo_ef_cat_id FROM tgo_ef_categories WHERE tgo_ef_cat_id = ?`, [tgo_ef_cat_id]);
        if (!category.length) return [];
        const tgoid = category[0].tgo_ef_cat_id;

        const [subTgo] = await db.query(
            `SELECT tgo_ef_subcat_id FROM tgo_ef_subcategories WHERE tgo_ef_subcat_id = ? AND tgo_ef_cat_id = ?`,
            [tgo_ef_subcat_id, tgoid]
        );
        if (!subTgo.length) return [];
        const subTgoId = subTgo[0].tgo_ef_subcat_id;

        const [subEachTGO] = await db.query(
            `SELECT * FROM tgo_efs WHERE tgo_ef_subcat_id = ?`,
            [subTgoId]
        );
        return subEachTGO;
    }

};

module.exports = tgoModel;
