const Auditor = require('../Models/auditor');

exports.read = async (req, res) => {
    try {
        const auditor_id = req.params.auditor_id;
        const result = await Auditor.findById(auditor_id);
        if (!result) return res.status(404).json({ message: 'Auditor not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const results = await Auditor.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Auditor.create(data);
        res.status(201).json({ message: 'Auditor created', auditor_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.auditor_id;
        const data = req.body;
        const result = await Auditor.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Auditor not found' });
        res.json({ message: 'Auditor updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.auditor_id;
        const result = await Auditor.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Auditor not found' });
        res.json({ message: 'Auditor deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};