const Company = require('../Models/company');


exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Company.findById(id);
        if (!result) return res.status(404).json({ message: 'Company not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const results = await Company.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Company.create(data);
        res.status(201).json({ message: 'Company created', companyId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Company.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Company not found' });
        res.json({ message: 'Company updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Company.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Company not found' });
        res.json({ message: 'Company deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readByCompanyId = async (req, res) => {
    try {
        const company_id = req.params.company_id;
        const products = await Company.readByCompanyId(company_id);
        if (!products || products.length === 0) return res.status(404).json({ message: 'No products found for this company' });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};