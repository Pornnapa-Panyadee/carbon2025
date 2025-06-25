const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const db = require('../Config/db.js');

const form41Model = {
    create: async (data) => {
        const sql = `
            INSERT INTO cfp_report41_items (
                report_41_id, company_id, product_id, process_id, life_cycle_phase,
                item_name, item_unit, item_quantity, lci_source_period,
                ef, ef_source, ef_source_ref, transport_type, ratio,
                ghg_emission, ghg_emission_proportion, cut_off, description,
                created_date, updated_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const values = [
            data.report_41_id, data.company_id, data.product_id, data.process_id,
            data.life_cycle_phase, data.item_name, data.item_unit, data.item_quantity,
            data.lci_source_period, data.ef, data.ef_source, data.ef_source_ref,
            data.transport_type, data.ratio, data.ghg_emission, data.ghg_emission_proportion,
            data.cut_off, data.description
        ];
        const [result] = await db.query(sql, values);
        return result;
    },

    findById: async (id) => {
        const sql = 'SELECT * FROM cfp_report41_items WHERE report_41_id = ?';
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
            UPDATE cfp_report41_items
            SET ${fields.join(', ')}
            WHERE report_41_id = ?
        `;
        values.push(id);
        const [result] = await db.query(sql, values);
        return result;
    },

    deleteById: async (id) => {
        const sql = 'DELETE FROM cfp_report41_items WHERE report_41_id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },

    createSum: async (data) => {
        const sql = `
          INSERT INTO cfp_report41_sums (
            product_id, sum_lc1_FU_qty, sum_lc1_emission, sum_lc1_emission_proportion,
            sum_lc2_FU_qty, sum_lc2_emission, sum_lc2_emission_proportion,
            sum_lc3_FU_qty, sum_lc3_emission, sum_lc3_emission_proportion,
            sum_lc4_FU_qty, sum_lc4_emission, sum_lc4_emission_proportion,
            sum_lc5_FU_qty, sum_lc5_emission, sum_lc5_emission_proportion,
            total_sum_emission, created_date, updated_date
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const values = [
            data.product_id,
            data.sum_lc1_FU_qty, data.sum_lc1_emission, data.sum_lc1_emission_proportion,
            data.sum_lc2_FU_qty, data.sum_lc2_emission, data.sum_lc2_emission_proportion,
            data.sum_lc3_FU_qty, data.sum_lc3_emission, data.sum_lc3_emission_proportion,
            data.sum_lc4_FU_qty, data.sum_lc4_emission, data.sum_lc4_emission_proportion,
            data.sum_lc5_FU_qty, data.sum_lc5_emission, data.sum_lc5_emission_proportion,
            data.total_sum_emission
        ];
        const [result] = await db.query(sql, values);
        return result;
    },

    findByIdSum: async (id) => {
        const sql = 'SELECT * FROM cfp_report41_sums WHERE report41_sum_id = ?';
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
            UPDATE cfp_report41_sums
            SET ${fields.join(', ')}
            WHERE report41_sum_id = ?
        `;
        values.push(id);
        const [result] = await db.query(sql, values);
        return result;
    },

    deleteByIdSum: async (id) => {
        const sql = 'DELETE FROM cfp_report41_sums WHERE report41_sum_id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },

    getFormById: async (id) => {
        // 1. ดึงข้อมูล form41 items + process_name
        const form41Query = `
            SELECT i.*, p.process_name
            FROM cfp_report41_items i
            LEFT JOIN processes p ON i.process_id = p.process_id
            WHERE i.product_id = ?
            ORDER BY i.life_cycle_phase ASC
        `;
        const [formResults] = await db.query(form41Query, [id]);
        if (!formResults.length) throw new Error('Form41 not found');

        const form41First = formResults[0];

        // 2. ดึงข้อมูล company, product, process, report41Sum
        const productQuery = 'SELECT * FROM products WHERE product_id = ?';
        const companyQuery = 'SELECT * FROM companies WHERE company_id = ?';
        const processQuery = 'SELECT * FROM processes WHERE product_id = ?';
        const report41SumQuery = 'SELECT * FROM cfp_report41_sums WHERE product_id = ?';

        const [[companyResults], [productResults], [processResults], [report41SumResults]] = await Promise.all([
            db.query(companyQuery, [form41First.company_id]),
            db.query(productQuery, [form41First.product_id]),
            db.query(processQuery, [form41First.product_id]),
            db.query(report41SumQuery, [form41First.product_id])
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
            form41: groupedResult,
            company: companyResults[0],
            product: productResults[0],
            process: processResults,
            report41Sum: report41SumResults
        };
    },

    setInputFr04: async (company_id, product_id) => {
        const productQuery = 'SELECT * FROM products WHERE product_id = ?';
        const companyQuery = 'SELECT * FROM companies WHERE company_id = ?';
        const processQuery = 'SELECT * FROM processes WHERE product_id = ? ORDER BY `processes`.`ordering` ASC';

        const inputQuery = `
                    SELECT DISTINCT  ip.*, ic.input_title_id, ic.input_title,ic.input_cat_name_TH, ic.input_cat_name
                    FROM input_processes ip
                    LEFT JOIN input_categories ic ON ip.input_title_id = ic.input_title_id
                    WHERE ip.process_id = ?
                `;

        const outputQuery = `
                    SELECT DISTINCT  op.*, oc.output_cat_name, oc.output_cat_name
                    FROM output_processes op
                    LEFT JOIN output_categories oc ON op.output_cat_id = oc.output_cat_id
                    WHERE op.process_id = ?
                `;

        const wastetQuery = `
                    SELECT DISTINCT  op.*, oc.waste_cat_name, oc.waste_cat_name
                    FROM waste_processes op
                    LEFT JOIN waste_categories oc ON op.waste_cat_id = oc.waste_cat_id
                    WHERE op.process_id = ?
                `;

        // 1. Company
        const [companyResults] = await db.query(companyQuery, [company_id]);
        if (!companyResults.length) throw new Error('Company not found');

        // 2. Product
        const [productResults] = await db.query(productQuery, [product_id]);
        if (!productResults.length) throw new Error('Product not found');

        // 3. Process
        const [processResults] = await db.query(processQuery, [product_id]);
        if (!processResults.length) throw new Error('Process not found');

        // 4. For each process, get inputs, outputs, wastes
        const phases = [1, 2];
        const form41Input = await Promise.all(phases.map(async (phase) => {
            const processes = await Promise.all(processResults.map(async (process) => {
                // Inputs
                const [inputResults] = await db.query(inputQuery, [process.process_id]);
                // Outputs
                const [outputResults] = await db.query(outputQuery, [process.process_id]);
                // Wastes
                const [wastetResults] = await db.query(wastetQuery, [process.process_id]);

                const rawInputs = inputResults.filter(item => item.input_title === "วัตถุดิบ");

                if (phase === 1) {
                    // phase 1: input เฉพาะ "วัตถุดิบ"
                    const rawInputs = inputResults.filter(item => item.input_title === "วัตถุดิบ");
                    return {
                        ...process,
                        life_cycle_phase: 1,
                        input: rawInputs
                        // output, waste ไม่ต้องใส่หรือใส่เป็น [] ก็ได้
                    };
                } else if (phase === 2) {
                    // phase 2: input, output, waste ครบ
                    return {
                        ...process,
                        life_cycle_phase: 2,
                        input: inputResults,
                        output: outputResults,
                        waste: wastetResults
                    };
                }
            }
            ));

            return {
                life_cycle_phase: phase,
                processes
            };
        }));

        return [form41Input];

    }
};

module.exports = form41Model;

