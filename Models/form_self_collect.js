const mysql = require('mysql2');
const db = require('../Config/db.js');

const selfCollectModel = {
    create: async (data) => {
        const sql = `
        INSERT INTO cfp_report43_selfcollect_efs (
            self_collect_id, item_name, item_type, item_unit, item_qty, item_fu_qty, item_source, item_ef, item_ef_source, item_ef_source_ref, item_emission,
            transport_type, type1_gas, type1_gas_unit, type1_gas_qty, type1_ef, type1_ef_source, type2_distance, type2_outbound_load, type2_return_load,
            type2_vehicle, type2_outbound_load_percent, type2_return_load_percent, type2_outbound_ef, type2_return_ef, type2_ef_source, type2_ef_source_ref,
            transport_emission, total_emission, proportion, ratio, cut_off, add_on_detail, created_date, updated_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const values = [
            data.self_collect_id, data.item_name, data.item_type, data.item_unit, data.item_qty, data.item_fu_qty, data.item_source, data.item_ef, data.item_ef_source, data.item_ef_source_ref, data.item_emission,
            data.transport_type, data.type1_gas, data.type1_gas_unit, data.type1_gas_qty, data.type1_ef, data.type1_ef_source, data.type2_distance, data.type2_outbound_load, data.type2_return_load,
            data.type2_vehicle, data.type2_outbound_load_percent, data.type2_return_load_percent, data.type2_outbound_ef, data.type2_return_ef, data.type2_ef_source, data.type2_ef_source_ref,
            data.transport_emission, data.total_emission, data.proportion, data.ratio, data.cut_off, data.add_on_detail
        ];
        const [result] = await db.query(sql, values);
        return result;
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
            // Inputs
            const [inputResults] = await db.query(inputQuery, [process.self_collect_id]);

            return {
                ...process,
                input: inputResults,
            };
        }));

        return [{
            processes
        }];
    },

};

module.exports = selfCollectModel;

