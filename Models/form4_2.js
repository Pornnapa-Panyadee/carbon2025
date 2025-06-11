const mysql = require('mysql2');
const db = require('../Config/db.js');

const form42Model = {
    create: async (data) => {
        const sql = `
        INSERT INTO cfp_report42_items (
            company_id, product_id, process_id, life_cycle_phase,
            item_name, item_unit, item_fu_qty, distance, distance_source, calculate_type,
            type1_gas, type1_gas_unit, type1_gas_qty, type1_ef, type1_ef_source,
            type2_outbound_load, type2_return_load, type2_vehicle, type2_outbound_load_percent,
            type2_return_load_percent, type2_outbound_ef, type2_return_ef, type2_ef_source, type2_ef_source_ref, ratio,
            transport_emission, cut_off, add_on_detail, created_date, updated_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const values = [
            data.company_id, data.product_id, data.process_id, data.life_cycle_phase,
            data.item_name, data.item_unit, data.item_fu_qty, data.distance, data.distance_source, data.calculate_type,
            data.type1_gas, data.type1_gas_unit, data.type1_gas_qty, data.type1_ef, data.type1_ef_source,
            data.type2_outbound_load, data.type2_return_load, data.type2_vehicle, data.type2_outbound_load_percent,
            data.type2_return_load_percent, data.type2_outbound_ef, data.type2_return_ef, data.type2_ef_source, data.type2_ef_source_ref, data.ratio,
            data.transport_emission, data.cut_off, data.add_on_detail
        ];
        const [result] = await db.query(sql, values);
        return result;
    },

    findById: async (id) => {
        const sql = 'SELECT * FROM cfp_report42_items WHERE report_42_id = ?';
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
            UPDATE cfp_report42_items
            SET ${fields.join(', ')}
            WHERE report_42_id = ?
        `;
        values.push(id);
        const [result] = await db.query(sql, values);
        return result;
    },

    deleteById: async (id) => {
        const sql = 'DELETE FROM cfp_report42_items WHERE report_42_id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },

    createSum: async (data) => {
        const sql = `
          INSERT INTO cfp_report42_sums (
            product_id, lc1_transport_emission, lc2_transport_emission,
            lc3_transport_emission, lc4_transport_emission, lc5_transport_emission,
            total_transport_emission, created_date, updated_date
          ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const values = [
            data.product_id,
            data.lc1_transport_emission,
            data.lc2_transport_emission,
            data.lc3_transport_emission,
            data.lc4_transport_emission,
            data.lc5_transport_emission,
            data.total_transport_emission
        ];
        const [result] = await db.query(sql, values);
        return result;
    },

    findByIdSum: async (id) => {
        const sql = 'SELECT * FROM cfp_report42_sums WHERE report42_sum_id = ?';
        const [rows] = await db.query(sql, [id]);
        return rows;
    },

    updateByIdSum: async (id, data) => {
        let fields = [];
        let values = [];
        for (const key in data) {
            fields.push(`${key} = ?`);
            values.push(data[key]);
        }
        fields.push('updated_date = NOW()');
        const sql = `
            UPDATE cfp_report42_sums
            SET ${fields.join(', ')}
            WHERE report42_sum_id = ?
        `;
        values.push(id);
        const [result] = await db.query(sql, values);
        return result;
    },

    deleteByIdSum: async (id) => {
        const sql = 'DELETE FROM cfp_report42_sums WHERE report42_sum_id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },

    getFormById: async (id) => {
        // 1. ดึงข้อมูล form41 items + process_name
        const form42Query = `
            SELECT i.*, p.process_name
            FROM cfp_report42_items i
            LEFT JOIN processes p ON i.process_id = p.process_id
            WHERE i.product_id = ?
            ORDER BY i.life_cycle_phase ASC
        `;
        const [formResults] = await db.query(form42Query, [id]);
        if (!formResults.length) throw new Error('Form42 not found');

        const form42First = formResults[0];

        // 2. ดึงข้อมูล company, product, process, report42Sum
        const productQuery = 'SELECT * FROM products WHERE product_id = ?';
        const companyQuery = 'SELECT * FROM companies WHERE company_id = ?';
        const processQuery = 'SELECT * FROM processes WHERE product_id = ?';
        const report42SumQuery = 'SELECT * FROM cfp_report42_sums WHERE product_id = ?';

        const [[companyResults], [productResults], [processResults], [report42SumResults]] = await Promise.all([
            db.query(companyQuery, [form42First.company_id]),
            db.query(productQuery, [form42First.product_id]),
            db.query(processQuery, [form42First.product_id]),
            db.query(report42SumQuery, [form42First.product_id])
        ]);

        if (!companyResults.length) throw new Error('Company not found');
        if (!productResults.length) throw new Error('Product not found');

        // เตรียม process map
        const processMap = {};
        processResults.forEach(p => {
            processMap[p.process_id] = p.process_name || 'Unknown Process';
        });

        // เตรียม process name list เฉพาะของ product นี้
        const processNames = [...new Set(processResults.map(p => p.process_name || 'Unknown Process'))];

        // สร้างโครงสร้างสำหรับเก็บข้อมูลจัดกลุ่ม
        const groupedData = {};

        // จัดกลุ่มจาก formResults: phase → process_name → production_class → items[]
        formResults.forEach(item => {
            const phase = item.life_cycle_phase;
            const processName = processMap[item.process_id] || 'Unknown Process';
            const prodClass = item.production_class || 'Unknown Production Class';

            if (!groupedData[phase]) groupedData[phase] = {};
            if (!groupedData[phase][processName]) groupedData[phase][processName] = {};
            if (!groupedData[phase][processName][prodClass]) groupedData[phase][processName][prodClass] = [];

            groupedData[phase][processName][prodClass].push(item);
        });

        // กำหนด phase ทั้งหมด (1–5)
        const allPhases = [1, 2, 3, 4, 5];

        // สร้างผลลัพธ์ groupedResult ครบทุก phase
        const groupedResult = allPhases.map(phase => {
            const processList = processNames.map(processName => {
                const prodClassMap = groupedData[phase]?.[processName] || {};
                const product = Object.entries(prodClassMap).map(([prodClass, items]) => ({
                    production_class: prodClass,
                    items: items
                }));

                return {
                    process_name: processName,
                    product: product.length > 0 ? product : []
                };
            });

            return {
                life_cycle_phase: phase,
                process: processList
            };
        });

        return {
            form42: groupedResult,
            company: companyResults[0],
            product: productResults[0],
            process: processResults,
            report42Sum: report42SumResults
        };
    }
};

module.exports = form42Model;

