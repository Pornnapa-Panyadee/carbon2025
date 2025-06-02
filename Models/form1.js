const db = require('../Config/db.js');

const Form1Model = {

    findByCompanyProduct: (company_id, product_id, callback) => {
        const productQuery = 'SELECT * FROM products WHERE product_id = ?';
        const companyQuery = 'SELECT * FROM companies WHERE company_id = ?';
        const processQuery = 'SELECT * FROM processes WHERE product_id = ?';

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

                                db.query(outputQuery, [process.process_id], (err, outputResults) => {
                                    if (err) return reject(err);

                                    resolve({
                                        ...process,
                                        inputs: inputResults,
                                        outputs: outputResults // ← output รวม output_cat_name แล้ว
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