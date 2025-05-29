const db = require('../Config/db.js');

const Form1Model = {

    findByCompanyProduct: (company_id, product_id, callback) => {
        const product = 'SELECT * FROM products WHERE product_id = ?';
        const company = 'SELECT * FROM companies WHERE company_id = ?';


        db.query(product, [product_id], (err, productResults) => {
            if (err) return callback(err);
            if (!productResults.length) return callback(new Error('Product not found'));

            db.query(company, [company_id], (err, companyResults) => {
                if (err) return callback(err);
                if (!companyResults.length) return callback(new Error('Company not found'));

                const result = {
                    product: productResults[0],
                    company: companyResults[0]
                };
                callback(null, [result]);
            });
        });
    },

}

module.exports = Form1Model;