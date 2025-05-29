const Form = require('../Models/form1');

exports.read = async (req, res) => {
    const company_id = req.params.company_id;
    const product_id = req.params.product_id;

    Form.findByCompanyProduct(company_id, product_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Product and Company not found' });
        res.json(results[0]); // ส่งข้อมูลที่พบกลับ
    });
};
