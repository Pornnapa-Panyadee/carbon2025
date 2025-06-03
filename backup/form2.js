const db = require('../Config/db.js');

const Form2Model = {

    findByCompanyProduct: (company_id, product_id, callback) => {
        const product = 'SELECT * FROM products WHERE product_id = ?';
        const company = 'SELECT * FROM companies WHERE company_id = ?';


        db.query(company, [company_id], (err, companyResults) => {
            if (err) return callback(err);
            if (!companyResults.length) return callback(new Error('Product not found'));

            db.query(product, [product_id], (err, productResults) => {
                if (err) return callback(err);
                if (!productResults.length) return callback(new Error('Company not found'));

                const product = productResults[0];

                const processQuery = 'SELECT * FROM processes WHERE process_id = ?';

                db.query(processQuery, [product.product_id], (err, processResults) => {
                    if (err) return callback(err);
                    if (!processResults.length) return callback(new Error('Process not found'));
                    const process = processResults[0];
                    const input = 'SELECT * FROM input_processes WHERE process_id = ? ';
                    const inputCat = 'SELECT * FROM input_categories WHERE 1';

                    db.query(input, [process.process_id], (err, inputResults) => {
                        if (err) return callback(err);
                        if (!inputResults.length) return callback(new Error('Report41 Summary not found'));

                        const result = {
                            company: companyResults[0],
                            product: productResults[0],
                            process: processResults[0],
                            input: inputResults[0]
                        };

                        callback(null, result);
                    });
                });
            });
        });

    },

}

module.exports = Form2Model;