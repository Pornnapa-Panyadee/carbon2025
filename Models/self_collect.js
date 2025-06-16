const mysql = require('mysql2');
const db = require('../Config/db.js');

const selfColModel = {
    create: async (data) => {
        const sql = `
        INSERT INTO self_collect_efs  (
            company_id, product_id, self_collect_name, self_collect_ef, ratio, created_date, updated_date)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const values = [
            data.company_id, data.product_id, data.self_collect_name, data.self_collect_ef, data.ratio
        ];
        const [result] = await db.query(sql, values);
        return result;
    },

};

module.exports = selfColModel;