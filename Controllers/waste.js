const Waste = require('../Models/waste');


exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Waste.findById(id);
        if (!result) return res.status(404).json({ message: 'Waste category not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const results = await Waste.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Waste.create(data);
        res.status(201).json({ message: 'Waste category created', WasteId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Waste.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Waste category not found' });
        res.json({ message: 'Waste category updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Waste.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Waste category not found' });
        res.json({ message: 'Waste category deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Process

exports.readProcess = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Waste.findByIdProcess(id);
        if (!result) return res.status(404).json({ message: 'Waste process not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listProcess = async (req, res) => {
    try {
        const results = await Waste.findAllProcess();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProcess = async (req, res) => {
    try {
        const data = req.body;
        const result = await Waste.createProcess(data);
        res.status(201).json({ message: 'Waste process created', WasteId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProcess = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Waste.updateByIdProcess(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Waste process not found' });
        res.json({ message: 'Waste process updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeProcess = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Waste.deleteByIdProcess(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Waste process not found' });
        res.json({ message: 'Waste process deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};