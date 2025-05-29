const Process = require('../Models/process');


exports.read = async (req, res) => {
    const id = req.params.id;
    Process.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Process not found' });
        res.json(results[0]);
    });
}

exports.list = async (req, res) => {
    Process.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });

}

exports.create = async (req, res) => {
    const data = req.body;
    Process.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Process created', ProcessId: result.insertId });
    });
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Process.updateById(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Process not found' });
        res.json({ message: 'Process updated' });
    });

}

exports.remove = async (req, res) => {
    const id = req.params.id;
    Process.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Process not found' });
        res.json({ message: 'Process deleted' });
    });
};