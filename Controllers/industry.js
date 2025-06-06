const Industry = require('../Models/industry');

exports.read = async (req, res) => {
    try {
        const industrial_id = req.params.industrial_id;
        const result = await Industry.findById(industrial_id);
        if (!result) return res.status(404).json({ message: 'Industry not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const results = await Industry.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Industry.create(data);
        res.status(201).json({ message: 'Industry created', industrial_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.industrial_id;
        const data = req.body;
        const result = await Industry.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Industry not found' });
        res.json({ message: 'Industry updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.industrial_id;
        const result = await Industry.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Industry not found' });
        res.json({ message: 'Industry deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};