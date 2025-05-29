const Auditor = require('../Models/auditor');

exports.read = async (req, res) => {
    const auditor_id = req.params.auditor_id;
    Auditor.findById(auditor_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Auditor not found' });
        res.json(results[0]);
    });
}

exports.list = async (req, res) => {
    Auditor.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });

}

exports.create = async (req, res) => {
    const data = req.body;
    Auditor.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Auditor created', auditor_id: result.insertId });
    });
};

exports.update = async (req, res) => {
    const id = req.params.auditor_id;
    const data = req.body;
    Auditor.updateById(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Company not found' });
        res.json({ message: 'Auditor updated' });
    });

}

exports.remove = async (req, res) => {
    const id = req.params.auditor_id;
    Auditor.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Company not found' });
        res.json({ message: 'Auditor deleted' });
    });
};