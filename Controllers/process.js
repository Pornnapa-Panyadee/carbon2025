const Process = require('../Models/process');


exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Process.findById(id);
        if (!result) return res.status(404).json({ message: 'Process not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readbyproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Process.findByProduct(id);
        if (!result) return res.status(404).json({ message: 'Process not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.list = async (req, res) => {
    try {
        const results = await Process.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;

        const result = await Process.create(data, file);

        res.status(201).json({
            message: 'Process created',
            ProcessId: result.insertId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Process.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Process not found' });
        res.json({ message: 'Process updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Process.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Process not found' });
        res.json({ message: 'Process deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};