const Dgoods = require('../../Models/cbam/d_goods');


exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Dgoods.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await Dgoods.updateByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperId = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Dgoods.readperId(id);
        if (!result) return res.status(404).json({ message: 'D goods not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Dgoods.deleteById(id);
        if (!result) return res.status(404).json({ message: 'D goods not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.readperIdreport = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Dgoods.readperIdreport(id);
        if (!result) return res.status(404).json({ message: 'D goods not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteByIdreport = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Dgoods.deleteByIdreport(id);
        if (!result) return res.status(404).json({ message: 'D goods not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};