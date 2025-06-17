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

    findsubcat: async (categories) => {
        const [category] = await db.query(`SELECT tgo_ef_cat_id  FROM  tgo_ef_categories WHERE tgo_ef_cat_name = ?`, [categories]);
        if (!category.length) return [];
        const categoryId = category[0].tgo_ef_cat_id;
        const [subcategories] = await db.query(`SELECT * FROM tgo_ef_subcategories WHERE tgo_ef_cat_id = ?`, [categoryId]);
        return subcategories;
    },

    findEachcat: async (categories, subCategory) => {
        const [category] = await db.query(`SELECT tgo_ef_cat_id FROM tgo_ef_categories WHERE tgo_ef_cat_name = ?`, [categories]);
        if (!category.length) return [];
        const tgoid = category[0].tgo_ef_cat_id;

        const [subTgo] = await db.query(
            `SELECT tgo_ef_subcat_id FROM tgo_ef_subcategories WHERE tgo_ef_subcat_name = ? AND tgo_ef_cat_id = ?`,
            [subCategory, tgoid]
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
