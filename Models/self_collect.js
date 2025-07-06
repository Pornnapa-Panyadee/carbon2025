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

    createProcessSC: async (data) => {
        const query = `
                INSERT INTO self_collect_efs SET ?, created_date = NOW(), updated_date = NOW()
            `;
        const [result] = await db.query(query, [data]);
        return result;
    },



    readProcessSCByID: async (id) => {
        const query = 'SELECT * FROM self_collect_efs WHERE self_collect_id = ?';
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    updateProcessSCByID: async (data) => {
        const { id, ...updateFields } = data;
        const query = `
                UPDATE self_collect_efs
                SET ?, updated_date = NOW()
                WHERE self_collect_id = ?
            `;
        const [result] = await db.query(query, [updateFields, id]);
        return result;
    },

    deleteProcessSCByID: async (id) => {
        const [result] = await db.query('DELETE FROM self_collect_efs WHERE self_collect_id = ?', [id]);
        return result;
    },

    getSelfCollectById: async (company_id, self_collect_id) => {
        const [rows] = await db.query(
            `SELECT * FROM self_collect_efs WHERE company_id = ? AND self_collect_id = ?`,
            [company_id, self_collect_id]
        );
        return rows[0]; // return row เดียว
    },

    getItemsBySelfCollectId: async (self_collect_id) => {
        const [rows] = await db.query(
            `SELECT cfp_report43_selfcollect_efs_id, item_name, item_type
             FROM cfp_report43_selfcollect_efs
             WHERE self_collect_id = ?`,
            [self_collect_id]
        );
        return rows;
    }


};

module.exports = selfColModel;