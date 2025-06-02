const db = require('../Config/db.js');

const Form1Model = {

    findByCompanyProduct: (company_id, product_id, callback) => {
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

        db.query(companyQuery, [company_id], (err, companyResults) => {
            if (err) return callback(err);
            if (!companyResults.length) return callback(new Error('Company not found'));

            db.query(productQuery, [product_id], (err, productResults) => {
                if (err) return callback(err);
                if (!productResults.length) return callback(new Error('Product not found'));

                db.query(processQuery, [product_id], (err, processResults) => {
                    if (err) return callback(err);
                    if (!processResults.length) return callback(new Error('Process not found'));

                    const processPromises = processResults.map(process => {
                        return new Promise((resolve, reject) => {
                            db.query(inputQuery, [process.process_id], (err, inputResults) => {
                                if (err) return reject(err);

                                // ✅ Group inputs by input_cat_id
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

                                const inputsGroupedArray = Object.values(groupedInputs); // convert from object to array

                                db.query(outputQuery, [process.process_id], (err, outputResults) => {
                                    if (err) return reject(err);

                                    db.query(wastetQuery, [process.process_id], (err, wastetResults) => {
                                        if (err) return reject(err);

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


                                        resolve({
                                            ...process,
                                            inputs: inputsGroupedArray,
                                            outputs: outputResults,
                                            wastes: wastesGroupedArray
                                        });
                                    });
                                });
                            });
                        });
                    });

                    Promise.all(processPromises)
                        .then(processesWithIO => {
                            const result = {
                                product: productResults[0],
                                company: companyResults[0],
                                process: processesWithIO
                            };
                            callback(null, [result]);
                        })
                        .catch(err => callback(err));
                });
            });
        });
    }



}

module.exports = Form1Model;