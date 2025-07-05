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
        const selfQuery = 'SELECT * FROM self_collect_efs WHERE product_id = ? AND company_id = ?';

        const inputQuery = `
                SELECT DISTINCT  *
                FROM cfp_report43_selfcollect_efs 
                WHERE self_collect_id = ?
            `;

        // 1. Company
        const [companyResults] = await db.query(selfQuery, [product_id, company_id]);
        if (!companyResults.length) throw new Error('Company not found');

        // 4. For each process, get inputs, outputs, wastes
        const processes = await Promise.all(companyResults.map(async (process) => {
            // Inputs & Outputs
            const [inputResults] = await db.query(inputQuery, [process.self_collect_id]);

            // แยก input และ output ตาม item_type
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

    listselfcollect: async (id) => {
        const sql = 'SELECT * FROM self_collect_efs WHERE company_id = ?';
        const [rows] = await db.query(sql, [id]);
        return [rows];
    },


    listSelfCollectId: async (company_id, self_collect_id) => {
        const selfQuery = 'SELECT * FROM self_collect_efs WHERE self_collect_id = ? AND company_id = ?';

        const inputQuery = `
                SELECT DISTINCT  *
                FROM cfp_report43_selfcollect_efs 
                WHERE self_collect_id = ?
            `;

        // 1. Company
        const [companyResults] = await db.query(selfQuery, [self_collect_id, company_id]);
        if (!companyResults.length) throw new Error('Company not found');

        // 4. For each process, get inputs, outputs, wastes
        const processes = await Promise.all(companyResults.map(async (process) => {
            // Inputs & Outputs
            const [inputResults] = await db.query(inputQuery, [process.self_collect_id]);

            // แยก input และ output ตาม item_type
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







};

module.exports = selfCollectModel;

