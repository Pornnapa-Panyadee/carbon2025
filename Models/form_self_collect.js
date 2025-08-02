const mysql = require('mysql2');
const db = require('../Config/db.js');

const selfCollectModel = {
    create: async (selfCollectId, items) => {
        const sql = `
        INSERT INTO cfp_report43_selfcollect_efs (
            self_collect_id, item_name, item_type, item_unit, item_qty, item_fu_qty, item_source, item_ef, item_ef_source, item_ef_source_ref, item_emission,
            transport_type, type1_gas, type1_gas_unit, type1_gas_qty, type1_ef, type1_ef_source, type2_distance, type2_outbound_load, type2_return_load,
            type2_vehicle, type2_outbound_load_percent, type2_return_load_percent, type2_outbound_ef, type2_return_ef, type2_ef_source, type2_ef_source_ref,
            transport_emission, total_emission, proportion, ratio, cut_off, add_on_detail, created_date, updated_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

        for (const item of items) {
            const values = [
                selfCollectId,
                item.item_name, item.item_type, item.item_unit, item.item_qty, item.item_fu_qty,
                item.item_source, item.item_ef, item.item_ef_source, item.item_ef_source_ref, item.item_emission,
                item.transport_type, item.type1_gas, item.type1_gas_unit, item.type1_gas_qty, item.type1_ef,
                item.type1_ef_source, item.type2_distance, item.type2_outbound_load, item.type2_return_load,
                item.type2_vehicle, item.type2_outbound_load_percent, item.type2_return_load_percent,
                item.type2_outbound_ef, item.type2_return_ef, item.type2_ef_source, item.type2_ef_source_ref,
                item.transport_emission, item.total_emission, item.proportion, item.ratio, item.cut_off, item.add_on_detail
            ];

            await db.query(sql, values);
        }

        return true;
    },

    findById: async (id) => {
        const sql = 'SELECT * FROM cfp_report43_selfcollect_efs WHERE cfp_report43_selfcollect_efs_id = ?';
        const [rows] = await db.query(sql, [id]);
        return rows;
    },

    updateById: async (id, data) => {
        let fields = [];
        let values = [];
        for (const key in data) {
            fields.push(`${key} = ?`);
            values.push(data[key]);
        }
        fields.push('updated_date = NOW()');
        const sql = `
            UPDATE cfp_report43_selfcollect_efs
            SET ${fields.join(', ')}
            WHERE cfp_report43_selfcollect_efs_id = ?
        `;
        values.push(id);
        const [result] = await db.query(sql, values);
        return result;
    },

    deleteById: async (id) => {
        const sql = 'DELETE FROM cfp_report43_selfcollect_efs WHERE cfp_report43_selfcollect_efs_id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },

    // Example: get all by self_collect_id
    findBySelfCollectId: async (self_collect_id) => {
        const sql = 'SELECT * FROM cfp_report43_selfcollect_efs WHERE self_collect_id = ?';
        const [rows] = await db.query(sql, [self_collect_id]);
        return rows;
    },

    findByProductIdSelf: async (company_id, product_id) => {
        // Step 1: Get ef_source_ref
        const f41selfcollectQuery = `
            SELECT ef_source_ref 
            FROM cfp_report41_items 
            WHERE product_id = ? AND company_id = ? AND ef_source = "Self collect"
        `;
        const [refResults] = await db.query(f41selfcollectQuery, [product_id, company_id]);

        if (!refResults.length) throw new Error('No ef_source_ref found for this product');

        // Step 2: Get self_collect_efs by self_collect_name = ef_source_ref
        const selfQuery = `
            SELECT * 
            FROM self_collect_efs 
            WHERE self_collect_name = ?
        `;

        // เราอาจมีหลาย ref → map เป็น Promise.all
        const processes = await Promise.all(refResults.map(async (refRow) => {
            const ef_source_ref = refRow.ef_source_ref;

            const [selfResults] = await db.query(selfQuery, [ef_source_ref]);
            if (!selfResults.length) throw new Error(`No self_collect_efs found for ref: ${ef_source_ref}`);

            // สมมติว่ามีได้แค่ 1 result ต่อชื่อ
            const process = selfResults[0];

            // Step 3: Get input/output from cfp_report43_selfcollect_efs
            const inputQuery = `
                SELECT DISTINCT * 
                FROM cfp_report43_selfcollect_efs 
                WHERE self_collect_id = ?
            `;

            const [inputResults] = await db.query(inputQuery, [process.self_collect_id]);
            const inputs = inputResults.filter(item => item.item_type === 'input');
            const outputs = inputResults.filter(item => item.item_type === 'output');

            return {
                ...process,
                input: inputs,
                output: outputs
            };
        }));

        return [{ processes }];
    },

    listselfcollect: async (id) => {
        const sql = 'SELECT * FROM self_collect_efs WHERE company_id = ?';
        const [rows] = await db.query(sql, [id]);
        return [rows];
    },


    listSelfCollectId: async (company_id, product_id) => {
        const findIdsQuery = `
            SELECT DISTINCT ef_source_ref
            FROM cfp_report41_items
            WHERE product_id = ? AND ef_source = 'Self collect'
        `;

        const [refRows] = await db.query(findIdsQuery, [product_id]);

        if (!refRows.length) throw new Error('No Self Collect references found for this product');

        const selfCollectIds = refRows.map(row => row.ef_source_ref);
        const placeholders = selfCollectIds.map(() => '?').join(',');

        // Step 2: ดึง self_collect_efs ที่มี company_id ตรง และ self_collect_id ที่เจอ
        const selfQuery = `
        SELECT *
        FROM self_collect_efs
        WHERE company_id = ? AND self_collect_id IN (${placeholders})
    `;
        const [companyResults] = await db.query(selfQuery, [company_id, ...selfCollectIds]);

        if (!companyResults.length) throw new Error('No matching self_collect_efs found for this company/product');

        // Step 3: วนแต่ละ self_collect_id เพื่อดึง input/output จาก cfp_report43_selfcollect_efs
        const inputQuery = `
                SELECT
                    s.*,
                    t1.item AS type2_vehicle_item,
                    t2.item AS type2_vehicle_return_item
                FROM cfp_report43_selfcollect_efs s
                LEFT JOIN tgo_efs t1 ON s.type2_vehicle = t1.ef_id
                LEFT JOIN tgo_efs t2 ON s.type2_vehicle_return = t2.ef_id
                WHERE s.self_collect_id = ?
            `;

        const processes = await Promise.all(companyResults.map(async (process) => {
            const [inputResults] = await db.query(inputQuery, [process.self_collect_id]);

            const inputs = inputResults.filter(item => item.item_type === 'input');
            const outputs = inputResults.filter(item => item.item_type === 'output');

            return {
                ...process,
                input: inputs,
                output: outputs,
            };
        }));

        return [{
            processes
        }];
    },

    updateSelfCollectItem: async (data) => {
        const { cfp_report43_selfcollect_efs_id, ...updateFields } = data;

        const query = `
            UPDATE cfp_report43_selfcollect_efs
            SET ?, updated_date = NOW()
            WHERE cfp_report43_selfcollect_efs_id = ?
        `;

        const [result] = await db.query(query, [updateFields, cfp_report43_selfcollect_efs_id]);

        return result;
    },

    deleteSelfCollect: async (self_collect_id) => {
        await db.query('DELETE FROM cfp_report43_selfcollect_efs WHERE self_collect_id = ?', [self_collect_id]);
        await db.query('DELETE FROM self_collect_efs WHERE self_collect_id = ?', [self_collect_id]);
    },

    // Follow Process and input output data

    createItemSC: async (data) => {
        // 1. Insert item ใหม่
        const insertQuery = `
            INSERT INTO cfp_report43_selfcollect_efs SET ?, created_date = NOW(), updated_date = NOW()
        `;
        const [insertResult] = await db.query(insertQuery, [data]);

        // 2. บวกค่า total_emission ไปยัง self_collect_efs.self_collect_ef
        const updateQuery = `
            UPDATE self_collect_efs
            SET self_collect_ef = IFNULL(self_collect_ef, 0) + ?, updated_date = NOW()
            WHERE self_collect_id = ?
        `;
        const [updateResult] = await db.query(updateQuery, [
            data.total_emission,     // ค่าที่เพิ่ง insert ไป
            data.self_collect_id     // อ้างอิง self_collect_id เดียวกัน
        ]);

        return {
            insert: insertResult,
            update: updateResult
        };
    },


    readItemSCByID: async (id) => {
        const query = 'SELECT * FROM cfp_report43_selfcollect_efs WHERE cfp_report43_selfcollect_efs_id  = ?';
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    updateItemSCByID: async (data) => {
        const { id, ...updateFields } = data;
        const query = `
            UPDATE cfp_report43_selfcollect_efs
            SET ?, updated_date = NOW()
            WHERE cfp_report43_selfcollect_efs_id  = ?
        `;
        const [result] = await db.query(query, [updateFields, id]);
        return result;
    },

    deleteItemSCByID: async (id) => {

        const [result] = await db.query('DELETE FROM cfp_report43_selfcollect_efs WHERE cfp_report43_selfcollect_efs_id = ?', [id]);
        return result;


    },





};

module.exports = selfCollectModel;



