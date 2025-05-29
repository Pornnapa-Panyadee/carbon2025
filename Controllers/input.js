const Input = require('../Models/input');


exports.read = async (req, res) => {
    const id = req.params.id;
    Input.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Input category not found' });
        res.json(results[0]);
    });
}

exports.list = async (req, res) => {
    Input.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });

}

exports.create = async (req, res) => {
    const data = req.body;
    Input.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Input category created', InputId: result.insertId });
    });
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Input.updateById(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Input category not found' });
        res.json({ message: 'Input category updated' });
    });

}

exports.remove = async (req, res) => {
    const id = req.params.id;
    Input.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Input category not found' });
        res.json({ message: 'Input category deleted' });
    });
};

// Process

exports.readProcess = async (req, res) => {
    const id = req.params.id;
    Input.findByIdProcess(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Input process not found' });
        res.json(results[0]);
    });
}

exports.listProcess = async (req, res) => {
    Input.findAllProcess((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });

}

exports.createProcess = async (req, res) => {
    const data = req.body;
    Input.createProcess(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Input process created', InputId: result.insertId });
    });
};

exports.updateProcess = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Input.updateByIdProcess(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Input process not found' });
        res.json({ message: 'Input process updated' });
    });

}

exports.removeProcess = async (req, res) => {
    const id = req.params.id;
    Input.deleteByIdProcess(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Input process not found' });
        res.json({ message: 'Input process deleted' });
    });
};