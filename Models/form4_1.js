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
        const processQuery = 'SELECT process_id, process_name  FROM processes WHERE product_id = ? ORDER BY `processes`.`ordering` ASC';

        const inputQuery = `
                    SELECT DISTINCT  ip.input_process_id AS item_id, ip.input_name AS item_name, ip.input_unit AS item_unit,ip.input_quantity AS item_quantity,ip.chemical_reaction AS chemical_reaction  , ic.input_title, 'input' AS item_class
                    FROM input_processes ip
                    LEFT JOIN input_categories ic ON ip.input_title_id = ic.input_title_id
                    WHERE ip.process_id = ?
                `;

        const outputQuery = `
                    SELECT DISTINCT  op.output_process_id AS item_id, op.output_name AS item_name, op.output_unit AS item_unit, op.output_quantity AS item_quantity,'output' AS item_class
                    FROM output_processes op
                    LEFT JOIN output_categories oc ON op.output_cat_id = oc.output_cat_id
                    WHERE op.process_id = ?
                `;

        const wastetQuery = `
                    SELECT DISTINCT  op.waste_process_id AS item_id, op.waste_name AS item_name, op.waste_unit AS item_unit, op.waste_qty AS item_quantity,'waste' AS item_class
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
        const phases = [1, 2, 3, 4, 5];
        const phase_name = ["การได้มาของวัตถุดิบ", "การผลิต", "การกระจายสินค้า", "การใช้งาน", "การจัดการซาก"];
        // const phases = [
        //     { phase: 1, name: "การได้มาของวัตถุดิบ" },
        //     { phase: 2, name: "การผลิต" },
        //     { phase: 3, name: "การกระจายสินค้า" },
        //     { phase: 4, name: "การใช้งาน" },
        //     { phase: 5, name: "การจัดการซาก" }
        // ];
        const form41Input = await Promise.all(phases.map(async (phase) => {
            const processes = await Promise.all(processResults.map(async (process) => {
                const [inputResults] = await db.query(inputQuery, [process.process_id]);
                const [outputResults] = await db.query(outputQuery, [process.process_id]);
                const [wastetResults] = await db.query(wastetQuery, [process.process_id]);
                const rawInputs = inputResults.filter(item => item.input_title === "วัตถุดิบ");

                if (phase === 1) {
                    // phase 1: input เฉพาะ "วัตถุดิบ"
                    const rawInputs = inputResults.filter(item => item.input_title === "วัตถุดิบ");
                    return {
                        ...process,

                        item: rawInputs
                        // output, waste ไม่ต้องใส่หรือใส่เป็น [] ก็ได้
                    };
                } else if (phase === 2) {
                    // phase 2: input, output, waste ครบ
                    return {
                        ...process,
                        item: [...inputResults, ...outputResults, ...wastetResults]
                    };
                } else if (phase === 3) {
                    return {
                    };
                } else if (phase === 4) {
                    return {
                    };
                } else if (phase === 5) {
                    return {
                    };
                }
            }
            ));

            const [FU] = await db.query(
                `SELECT SUM(op.output_quantity) AS FU
                 FROM output_processes op
                 JOIN processes p ON op.process_id = p.process_id
                 WHERE op.finish_output = 1 AND p.product_id = ?`,
                [product_id]
            );


            return {
                life_cycle_phase: phase,
                life_cycle_phase_name: phase_name[phase - 1],
                product_id: product_id,
                FU: FU[0]["FU"],

                processes
            };
        }));

        return [form41Input];

    },

    getFormByIdweb: async (id) => {
        // 1. ดึงข้อมูล form41 items + process_name
        const form41Query = `
            SELECT
                i.report_41_id AS item_id,
                i.*, 
                p.process_id, 
                i.life_cycle_phase
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
        const phase_name = ["การได้มาของวัตถุดิบ", "การผลิต", "การกระจายสินค้า", "การใช้งาน", "การจัดการซาก"];

        // สร้างผลลัพธ์ groupedResult ครบทุก phase
        const groupedResult = allPhases.map(phase => {
            const processList = processNames.map(processName => {
                const prodClassMap = groupedData[phase]?.[processName] || {};

                // รวม item ทั้งหมด และใส่ production_class + process_name
                const product = Object.entries(prodClassMap).flatMap(([prodClass, items]) =>
                    items.map(item => ({
                        ...item,
                        production_class: prodClass,
                        process_name: processName
                    }))
                );

                return {
                    process_name: processName,
                    product: product // ไม่ต้องมี { items: [...] } อีกต่อไป
                };
            });

            return {

                life_cycle_phase: phase,
                life_cycle_phase_name: phase_name[phase - 1],
                process: processList
            };
        });

        return {
            form41: groupedResult,
            report41Sum: report41SumResults
        };
        // return [groupedResult];
    },

    readByItem: async ({ life_cycle_phase, company_id, product_id, className, item_id }) => {
        const classLower = className.toLowerCase();

        let processRowQuery = '';
        let processItem = null;
        let process_id = null;

        // Step 1: หาจาก process table
        if (classLower === 'input') {
            [[processItem]] = await db.query(`SELECT * FROM input_processes WHERE input_process_id = ?`, [item_id]);
        } else if (classLower === 'output') {
            [[processItem]] = await db.query(`SELECT * FROM output_processes WHERE output_process_id = ?`, [item_id]);
        } else if (classLower === 'waste') {
            [[processItem]] = await db.query(`SELECT * FROM waste_processes WHERE waste_process_id = ?`, [item_id]);
        } else {
            throw new Error('Invalid class');
        }

        if (!processItem) {
            throw new Error(`No process found with ID ${item_id}`);
        }

        process_id = processItem.process_id;

        // Step 2: หาจาก cfp_report41_items
        const [items] = await db.query(`
          SELECT * FROM cfp_report41_items
          WHERE life_cycle_phase = ? AND company_id = ? AND product_id = ? AND process_id = ? AND production_class = ?
        `, [life_cycle_phase, company_id, product_id, process_id, classLower]);

        if (!items || items.length === 0) {
            throw new Error('Item from cfp_report41_items not found');
        }

        return {
            itemInfo: items[0],
            processDetails: processItem
        };
    },


};

module.exports = form41Model;

