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

    findByName: async (id) => {

        const [names] = await db.query(`SELECT * FROM goods_categories WHERE industry_type_id  = ?`, [id]);
        return names;
    },
    findByRoutes: async (id) => {
        const [rows] = await db.query(
            `SELECT routes FROM goods_categories WHERE industry_type_id = ?`,
            [id]
        );

        // แปลงทุก record ให้ field routes เป็น array พร้อมเพิ่ม count
        const transformed = rows.map(item => {
            const routeArray = item.routes ? item.routes.split(',') : [];
            return {
                ...item,
                count: routeArray.length,
                routes: routeArray

            };
        });

        return transformed;
    },
    findByRelevantPrecursors: async (id) => {
        const [rows] = await db.query(`SELECT relevant_precursors  FROM goods_categories WHERE industry_type_id = ?`, [id]);
        const transformed = rows.map(item => ({
            ...item,
            relevant_precursors: item.relevant_precursors ? item.relevant_precursors.split(',') : []
        }));
        return transformed;
    },

};

module.exports = goodsModel;
