const db = require('../../Config/dbCbam.js');

const goodsModel = {
    findAll: async () => {
        const [rows] = await db.query(`SELECT name FROM industry_types`);
        return rows;
    },

    findGoods: async () => {
        const [rows] = await db.query(`SELECT * FROM goods_categories`);

        // แปลง routes และ relevant_precursors เป็น array และจัดกลุ่ม
        const grouped = {};

        rows.forEach(item => {
            // แปลง routes เป็น array
            item.routes = item.routes ? item.routes.split(',').map(r => r.trim()) : [];

            // แปลง relevant_precursors เป็น array (ถ้ามี)
            item.relevant_precursors = item.relevant_precursors
                ? item.relevant_precursors.split(',').map(p => p.trim())
                : [];

            // จัดกลุ่มตาม industry_type_id
            if (!grouped[item.industry_type_id]) {
                grouped[item.industry_type_id] = [];
            }
            grouped[item.industry_type_id].push(item);
        });

        // แปลง grouped object เป็น array
        const result = Object.entries(grouped).map(([industry_type_id, goods]) => ({
            industry_type_id: parseInt(industry_type_id),
            goods,
        }));

        return result;
    },

    findByName: async (name) => {
        const [rows] = await db.query(`SELECT id FROM industry_types WHERE name = ?`, [name]);
        if (!rows.length) return [];
        const industryId = rows[0].id;
        const [names] = await db.query(`SELECT name FROM goods_categories WHERE industry_type_id  = ?`, [industryId]);
        return names;
    },
    findByRoutes: async (name) => {
        const [rows] = await db.query(`SELECT routes FROM goods_categories WHERE name = ?`, [name]);

        // แปลงทุก record ให้ field routes เป็น array
        const transformed = rows.map(item => ({
            ...item,
            routes: item.routes ? item.routes.split(',') : []
        }));

        return transformed;
    },
    findByRelevantPrecursors: async (name) => {
        const [rows] = await db.query(`SELECT relevant_precursors  FROM goods_categories WHERE name = ?`, [name]);
        const transformed = rows.map(item => ({
            ...item,
            relevant_precursors: item.relevant_precursors ? item.relevant_precursors.split(',') : []
        }));
        return transformed;
    },

};

module.exports = goodsModel;
