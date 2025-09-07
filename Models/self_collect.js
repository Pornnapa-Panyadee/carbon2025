const mysql = require('mysql2');
const db = require('../Config/db.js');

const selfColModel = {
    create: async (data) => {
        const sql = `
        INSERT INTO self_collect_efs 
        SET ?, 
            created_date = NOW(), 
            updated_date = NOW()
    `;
        const [result] = await db.query(sql, data);
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
    },
    getSelfCollectById: async (company_id, id) => {
        const [rows] = await db.query(
            `SELECT * FROM self_collect_efs WHERE company_id = ? AND self_collect_id = ?`,
            [company_id, id]
        );
        return rows[0]; // สมมติว่า id เป็น unique
    },

    deleteItemSCByProcessItem: async (self_collect_id) => {
        // เริ่ม transaction
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            // ลบจากตารางย่อยก่อน
            await conn.query(
                `DELETE FROM cfp_report43_selfcollect_efs WHERE self_collect_id = ?`,
                [self_collect_id]
            );

            // ลบจาก self_collect_efs
            const [result] = await conn.query(
                `DELETE FROM self_collect_efs WHERE self_collect_id = ?`,
                [self_collect_id]
            );

            await conn.commit();
            return result;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    },




};

module.exports = selfColModel;