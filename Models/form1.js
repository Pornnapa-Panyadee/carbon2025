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
            product: productResults[0],
            company: companyResults[0],
            processes
        }];
    },
    findByCompanyProductAll: async (company_id, product_id) => {
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