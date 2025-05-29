const Output = require('../Models/output');


exports.read = async (req, res) => {
    const id = req.params.id;
    Output.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Output category not found' });
        res.json(results[0]);
    });
}

exports.list = async (req, res) => {
    Output.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });

}

exports.create = async (req, res) => {
    const data = req.body;
    Output.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Output category created', OutputId: result.insertId });
    });
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Output.updateById(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Output category not found' });
        res.json({ message: 'Output category updated' });
    });

}

exports.remove = async (req, res) => {
    const id = req.params.id;
    Output.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Output category not found' });
        res.json({ message: 'Output category deleted' });
    });
};

// Process

exports.readProcess = async (req, res) => {
    const id = req.params.id;
    Output.findByIdProcess(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Output process not found' });
        res.json(results[0]);
    });
}

exports.listProcess = async (req, res) => {
    Output.findAllProcess((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });

}

exports.createProcess = async (req, res) => {
    const data = req.body;
    Output.createProcess(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Output process created', OutputId: result.insertId });
    });
};

exports.updateProcess = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Output.updateByIdProcess(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Output process not found' });
        res.json({ message: 'Output process updated' });
    });

}

exports.removeProcess = async (req, res) => {
    const id = req.params.id;
    Output.deleteByIdProcess(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Output process not found' });
        res.json({ message: 'Output process deleted' });
    });
};