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


};

module.exports = adminModel;