const db = require('../Config/db.js');

const Form1Model = {
    findByCompanyProduct: async (company_id, product_id) => {
        const productQuery = 'SELECT * FROM products WHERE product_id = ?';
        const companyQuery = 'SELECT * FROM companies WHERE company_id = ?';
        const processQuery = 'SELECT * FROM processes WHERE product_id = ? ORDER BY `processes`.`ordering` ASC';

        const inputQuery = `
            SELECT ip.*, ic.input_cat_name
            FROM input_processes ip
            LEFT JOIN input_categories ic ON ip.input_cat_id = ic.input_cat_id
            WHERE ip.process_id = ?
        `;

        const outputQuery = `
            SELECT op.*, oc.output_cat_name
            FROM output_processes op
            LEFT JOIN output_categories oc ON op.output_cat_id = oc.output_cat_id
            WHERE op.process_id = ?
        `;

        const wastetQuery = `
            SELECT op.*, oc.waste_cat_name
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
                const catId = row.input_cat_id;
                if (!acc[catId]) {
                    acc[catId] = {
                        input_cat_id: catId,
                        input_cat_name: row.input_cat_name,
                        items: []
                    };
                }
                acc[catId].items.push(row);
                return acc;
            }, {});
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
    }
};

module.exports = Form1Model;