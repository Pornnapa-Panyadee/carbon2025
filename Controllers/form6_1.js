const Form61 = require('../Models/form6_1');


exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Form61.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await Form61.updateByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperId = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Form61.readperId(id);
        if (!result) return res.status(404).json({ message: 'Form61 not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperIdYear = async (req, res) => {
    try {
        const id = req.params.id;
        const year = req.params.year;
        const result = await Form61.readperIdYear(id, year);
        if (!result) return res.status(404).json({ message: 'Form61 not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Form61.deleteById(id);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: 'Form61 not found' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.readperIdreport = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const result = await Form61.readperIdreport(product_id);
        if (!result) return res.status(404).json({ message: 'Form61 not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
