const Output = require('../Models/output');


exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Output.findById(id);
        if (!result) return res.status(404).json({ message: 'Output category not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const results = await Output.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Output.create(data);
        res.status(201).json({ message: 'Output category created', OutputId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Output.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Output category not found' });
        res.json({ message: 'Output category updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Output.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Output category not found' });
        res.json({ message: 'Output category deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Process

exports.readProcess = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Output.findByIdProcess(id);
        if (!result) return res.status(404).json({ message: 'Output process not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listProcess = async (req, res) => {
    try {
        const results = await Output.findAllProcess();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProcess = async (req, res) => {
    try {
        const data = req.body;
        const result = await Output.createProcess(data);
        res.status(201).json({ message: 'Output process created', OutputId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProcess = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Output.updateByIdProcess(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Output process not found' });
        res.json({ message: 'Output process updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeProcess = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Output.deleteByIdProcess(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Output process not found' });
        res.json({ message: 'Output process deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};