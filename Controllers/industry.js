const Industry = require('../Models/industry');

exports.read = async (req, res) => {
    const industrial_id = req.params.industrial_id;
    Industry.findById(industrial_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Industry not found' });
        res.json(results[0]);
    });
}

exports.list = async (req, res) => {
    Industry.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });

}

exports.create = async (req, res) => {
    const data = req.body;
    Industry.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Industry created', industrial_id: result.insertId });
    });
};

exports.update = async (req, res) => {
    const id = req.params.industrial_id;
    const data = req.body;
    Industry.updateById(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Industry not found' });
        res.json({ message: 'Industry updated' });
    });

}

exports.remove = async (req, res) => {
    const id = req.params.industrial_id;
    Industry.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Company not found' });
        res.json({ message: 'Industry deleted' });
    });
};