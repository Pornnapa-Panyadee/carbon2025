const pcr = require('../Models/pcr');

exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pcr.findById(id);
        if (!result) return res.status(404).json({ message: 'PCR not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const results = await pcr.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await pcr.create(data);
        res.status(201).json({ message: 'PCR created', PCRId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await pcr.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'PCR not found' });
        res.json({ message: 'PCR updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pcr.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'PCR not found' });
        res.json({ message: 'PCR deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
