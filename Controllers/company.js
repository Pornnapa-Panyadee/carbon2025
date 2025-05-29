const Company = require('../Models/company');


exports.read = async (req, res) => {
    const id = req.params.id;
    Company.findById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Company not found' });
        res.json(results[0]);
    });
}

exports.list = async (req, res) => {
    Company.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });

}

exports.create = async (req, res) => {
    const data = req.body;
    Company.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Company created', companyId: result.insertId });
    });
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Company.updateById(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Company not found' });
        res.json({ message: 'Company updated' });
    });

}

exports.remove = async (req, res) => {
    const id = req.params.id;
    Company.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Company not found' });
        res.json({ message: 'Company deleted' });
    });
};