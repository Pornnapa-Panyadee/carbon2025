const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../Config/db.js');


const form41Model = {

    create: async (data, callback) => {
        try {
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

            db.query(sql, values, (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            });
        } catch (err) {
            callback(err);
        }
    },

    findById: (id, callback) => {
        const sql = 'SELECT * FROM cfp_report41_items WHERE report_41_id = ?';
        db.query(sql, [id], callback);
    },


    updateById: (id, data, callback) => {
        // เตรียมส่วนของ SQL และค่าตาม field ที่ส่งเข้ามาเท่านั้น
        let fields = [];
        let values = [];

        for (const key in data) {
            // ข้าม key ที่ไม่ใช่คอลัมน์ในฐานข้อมูลถ้าจำเป็น
            fields.push(`${key} = ?`);
            values.push(data[key]);
        }

        // เพิ่มวันที่อัปเดต
        fields.push('updated_date = NOW()');

        // ใส่ WHERE เงื่อนไข
        const sql = `
            UPDATE cfp_report41_items
            SET ${fields.join(', ')}
            WHERE report_41_id = ?
        `;

        values.push(id); // ใส่ id ไปเป็นตัวสุดท้าย

        db.query(sql, values, callback);
    },


    deleteById: (id, callback) => {
        const sql = 'DELETE FROM cfp_report41_items WHERE report_41_id = ?';
        db.query(sql, [id], callback);
    },

    createSum: (data, callback) => {
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
        db.query(sql, values, callback);
    },

    findByIdSum: (id, callback) => {
        const sql = 'SELECT * FROM cfp_report41_sums WHERE report41_sum_id = ?';
        db.query(sql, [id], callback);
    },


    updateByIdSum: (id, data, callback) => {
        let fields = [];
        let values = [];

        for (const key in data) {
            // ข้าม key ที่ไม่ใช่คอลัมน์ในฐานข้อมูลถ้าจำเป็น
            fields.push(`${key} = ?`);
            values.push(data[key]);
        }
        fields.push('updated_date = NOW()');

        const sql = `
        UPDATE cfp_report41_sums
        SET ${fields.join(', ')}
        WHERE report41_sum_id = ?`;


        values.push(id);

        db.query(sql, values, callback);
    },

    deleteByIdSum: (id, callback) => {
        const sql = 'DELETE FROM cfp_report41_sums WHERE report41_sum_id = ?';
        db.query(sql, [id], callback);
    },

    getFormById: (id, callback) => {
        const form41Query = `
            SELECT i.*, p.process_name
            FROM cfp_report41_items i
            LEFT JOIN processes p ON i.process_id = p.process_id
            WHERE i.product_id = ?
            ORDER BY i.life_cycle_phase ASC
        `;

        db.query(form41Query, [id], (err, formResults) => {
            if (err) return callback(err);
            if (!formResults.length) return callback(new Error('Form41 not found'));

            const form41First = formResults[0];

            const productQuery = 'SELECT * FROM products WHERE product_id = ?';
            const companyQuery = 'SELECT * FROM companies WHERE company_id = ?';
            const processQuery = 'SELECT * FROM processes WHERE product_id = ?';
            const report41SumQuery = 'SELECT * FROM cfp_report41_sums WHERE product_id = ?';

            db.query(companyQuery, [form41First.company_id], (err, companyResults) => {
                if (err) return callback(err);
                if (!companyResults.length) return callback(new Error('Company not found'));

                db.query(productQuery, [form41First.product_id], (err, productResults) => {
                    if (err) return callback(err);
                    if (!productResults.length) return callback(new Error('Product not found'));

                    db.query(processQuery, [form41First.product_id], (err, processResults) => {
                        if (err) return callback(err);

                        db.query(report41SumQuery, [form41First.product_id], (err, report41SumResults) => {
                            if (err) return callback(err);

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


                            const result = {
                                form41: groupedResult,
                                company: companyResults[0],
                                product: productResults[0],
                                process: processResults,
                                report41Sum: report41SumResults
                            };

                            callback(null, result);
                        });
                    });
                });
            });
        });
    }












};



module.exports = form41Model;

