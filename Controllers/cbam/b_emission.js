const Bemission = require('../../Models/cbam/b_emission');


exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Bemission.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await Bemission.updateByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperId = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Bemission.readperId(id);
        if (!result) return res.status(404).json({ message: 'Bemission not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Bemission.deleteById(id);
        if (!result) return res.status(404).json({ message: 'Bemission not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.readperIdreport = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Bemission.readperIdreport(id);
        if (!result) return res.status(404).json({ message: 'Bemission not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteByIdreport = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Bemission.deleteByIdreport(id);
        if (!result) return res.status(404).json({ message: 'Bemission not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};