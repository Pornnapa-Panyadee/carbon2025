const Form = require('../Models/form1');

exports.read = async (req, res) => {
    try {
        const company_id = req.params.company_id;
        const product_id = req.params.product_id;
        const results = await Form.findByCompanyProduct(company_id, product_id);
        if (!results || !results.length) {
            return res.status(404).json({ message: 'Product and Company not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
