const Input = require('../Models/input');


exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Input.findById(id);
        if (!result) return res.status(404).json({ message: 'Input category not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const results = await Input.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Input.create(data);
        res.status(201).json({ message: 'Input category created', InputId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Input.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Input category not found' });
        res.json({ message: 'Input category updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Input.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Input category not found' });
        res.json({ message: 'Input category deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Process

exports.readProcess = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Input.findByIdProcess(id);
        if (!result) return res.status(404).json({ message: 'Input process not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listProcess = async (req, res) => {
    try {
        const results = await Input.findAllProcess();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProcess = async (req, res) => {
    try {
        const data = req.body;
        const result = await Input.createProcess(data);
        res.status(201).json({ message: 'Input process created', InputId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProcess = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Input.updateByIdProcess(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Input process not found' });
        res.json({ message: 'Input process updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeProcess = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Input.deleteByIdProcess(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Input process not found' });
        res.json({ message: 'Input process deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};