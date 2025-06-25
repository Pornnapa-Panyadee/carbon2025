const Form41 = require('../Models/form4_1');

// Item
exports.create_item = async (req, res) => {
    try {
        const data = req.body;
        const result = await Form41.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.read_item = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const results = await Form41.findById(id);
        if (!results || results.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update_item = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const data = req.body;
        const result = await Form41.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ error: 'Not found or no changes made' });
        res.json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove_item = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await Form41.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Sum
exports.create_sum = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({ error: "Missing data" });
        const result = await Form41.createSum(data);
        res.status(201).json({ message: "Created successfully", result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.read_sum = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const results = await Form41.findByIdSum(id);
        if (!results || results.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update_sum = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const data = req.body;
        const result = await Form41.updateByIdSum(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ error: 'Not found or no changes made' });
        res.json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove_sum = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await Form41.deleteByIdSum(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.read_form = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await Form41.getFormById(id);
        if (!result) return res.status(404).json({ error: 'Not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.read_f03 = async (req, res) => {
    try {
        const company_id = parseInt(req.params.company_id, 10);
        const product_id = parseInt(req.params.product_id, 10);
        const results = await Form41.setInputFr04(company_id, product_id);
        if (!results || !results.length) {
            return res.status(404).json({ message: 'Product and Company not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};