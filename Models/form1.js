const db = require('../Config/db.js');

const Form1Model = {
    findByCompanyProduct: async (company_id, product_id) => {
        const productQuery = 'SELECT * FROM products WHERE product_id = ?';
        const companyQuery = 'SELECT * FROM companies WHERE company_id = ?';
        const processQuery = 'SELECT * FROM processes WHERE product_id = ? ORDER BY `processes`.`ordering` ASC';

        const inputQuery = `
        SELECT DISTINCT  ip.*, ic.input_title_id, ic.input_title
        FROM input_processes ip
        LEFT JOIN input_categories ic ON ip.input_title_id = ic.input_title_id
        WHERE ip.process_id = ?
    `;

        const outputQuery = `
        SELECT DISTINCT  op.*, oc.output_cat_name
        FROM output_processes op
        LEFT JOIN output_categories oc ON op.output_cat_id = oc.output_cat_id
        WHERE op.process_id = ?
    `;

        const wastetQuery = `
        SELECT DISTINCT  op.*, oc.waste_cat_name
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
        const processesAll = await Promise.all(processResults.map(async (process) => {
            // Inputs
            const [inputResults] = await db.query(inputQuery, [process.process_id]);
            // Outputs
            const [outputResults] = await db.query(outputQuery, [process.process_id]);
            // Wastes
            const [wastetResults] = await db.query(wastetQuery, [process.process_id]);

            return {
                ...process,
                input: inputResults,
                output: outputResults,
                waste: wastetResults
            };
        }));

        // 5. แยก process ออกเป็น 2 กลุ่ม
        const excludedNames = ['การกระจายสินค้า', 'การใช้งาน', 'การจัดการซาก'];

        const processes = processesAll.filter(p => !excludedNames.includes(p.process_name)); // กรองออก
        const processB2C = processesAll.filter(p => excludedNames.includes(p.process_name)); // เฉพาะ 3 ตัวนี้

        return [{
            product: productResults[0],
            company: companyResults[0],
            processes,   // process ที่เหลือ
            processB2C   // process ที่เป็น 3 ชื่อพิเศษ
        }];
    },

    findByCompanyProduct1: async (company_id, product_id) => {
        const productQuery = `
                SELECT 
                    p.product_id, p.company_id,p.product_name_th,p.product_name_en,
                    p.scope,p.FU_value,p.PU_value,p.FU_th, p.FU_en, p.PU_th, p.PU_en,
                    fu_th.product_unit_name_th AS FU_th_name,
                    fu_en.product_unit_name_en AS FU_en_name,
                    pu_th.product_unit_name_th AS PU_th_name,
                    pu_en.product_unit_name_en AS PU_en_name,
                    p.sale_ratio, p.product_techinfo, p.pcr_reference,pcr.pcr_name,
                    p.collect_data_start, p.collect_data_end, p.product_photo,p.auditor_id,p.verify_status,
                    p.submitted_round,p.submitted_date,p.created_date, p.updated_date
                FROM products p
                LEFT JOIN units fu_th ON p.FU_th = fu_th.product_unit_id
                LEFT JOIN units fu_en ON p.FU_en = fu_en.product_unit_id
                LEFT JOIN units pu_th ON p.PU_th = pu_th.product_unit_id
                LEFT JOIN units pu_en ON p.PU_en = pu_en.product_unit_id
                LEFT JOIN pcrs pcr ON p.pcr_reference = pcr.id
                WHERE p.product_id = ? `;
        const companyQuery = 'SELECT * FROM companies WHERE company_id = ?';
        const processQuery = 'SELECT * FROM processes WHERE product_id = ? ORDER BY `processes`.`ordering` ASC';

        const inputQuery = `
            SELECT DISTINCT  ip.*, ic.input_title_id, ic.input_title
            FROM input_processes ip
            LEFT JOIN input_categories ic ON ip.input_title_id = ic.input_title_id
            WHERE ip.process_id = ?
        `;

        const outputQuery = `       
            SELECT DISTINCT  op.*, oc.output_cat_name
            FROM output_processes op
            LEFT JOIN output_categories oc ON op.output_cat_id = oc.output_cat_id
            WHERE op.process_id = ?
        `;

        const wastetQuery = `
            SELECT DISTINCT  op.*, oc.waste_cat_name
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
        const processesWithIO = await Promise.all(processResults.map(async (process) => {
            // Inputs
            const [inputResults] = await db.query(inputQuery, [process.process_id]);
            const groupedInputs = inputResults.reduce((acc, row) => {
                const catId = row.input_title_id;
                if (!acc[catId]) {
                    acc[catId] = {
                        input_title_id: catId,
                        input_title: row.input_title,
                        items: []
                    };
                }
                acc[catId].items.push(row);
                return acc;
            }, {});

            // Default categories (ensure these match your DB values exactly)
            const defaultInputCategories = [
                { input_title_id: 1, input_title: "วัตถุดิบ" },
                { input_title_id: 2, input_title: "พลังงานและเชื้อเพลิง" },
                { input_title_id: 3, input_title: "ทรัพยากร และวัสดุช่วยการผลิต" }
            ];

            // Add missing categories with empty items
            defaultInputCategories.forEach(cat => {
                if (!groupedInputs[cat.input_title_id]) {
                    groupedInputs[cat.input_title_id] = {
                        input_title_id: cat.input_title_id,
                        input_title: cat.input_title,
                        items: []
                    };
                }
            });

            const inputsGroupedArray = Object.values(groupedInputs);

            // Outputs
            const [outputResults] = await db.query(outputQuery, [process.process_id]);

            // Wastes
            const [wastetResults] = await db.query(wastetQuery, [process.process_id]);
            const groupedWastes = wastetResults.reduce((acc, row) => {
                const catId = row.waste_cat_id;
                if (!acc[catId]) {
                    acc[catId] = {
                        waste_cat_id: catId,
                        waste_cat_name: row.waste_cat_name,
                        items: []
                    };
                }
                acc[catId].items.push(row);
                return acc;
            }, {});
            const wastesGroupedArray = Object.values(groupedWastes);

            return {
                ...process,
                inputs: inputsGroupedArray,
                outputs: outputResults,
                wastes: wastesGroupedArray
            };
        }));

        return [{
            product: productResults[0],
            company: companyResults[0],
            process: processesWithIO
        }];
    },

    findByCompanyProductAll: async (company_id, product_id) => {
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
        const processes = await Promise.all(processResults.map(async (process) => {
            // Inputs
            const [inputResults] = await db.query(inputQuery, [process.process_id]);
            // Outputs
            const [outputResults] = await db.query(outputQuery, [process.process_id]);
            // Wastes
            const [wastetResults] = await db.query(wastetQuery, [process.process_id]);

            return {
                ...process,
                input: inputResults,
                output: outputResults,
                waste: wastetResults
            };
        }));

        return [{
            processes
        }];
    }
};

module.exports = Form1Model;