const Installation = require('../../Models/cbam/installation');


exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Installation.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await Installation.updateByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperId = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Installation.readperId(id);
        if (!result) return res.status(404).json({ message: 'Installation not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Installation.deleteById(id);
        if (!result) return res.status(404).json({ message: 'Installation not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};