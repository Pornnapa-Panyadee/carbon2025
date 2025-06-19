const Cemission = require('../../Models/cbam/c_emission');


exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Cemission.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await Cemission.updateByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperId = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Cemission.readperId(id);
        if (!result) return res.status(404).json({ message: 'C emission not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Cemission.deleteById(id);
        if (!result) return res.status(404).json({ message: 'C emission not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.readperIdreport = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Cemission.readperIdreport(id);
        if (!result) return res.status(404).json({ message: 'C emission not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteByIdreport = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Cemission.deleteByIdreport(id);
        if (!result) return res.status(404).json({ message: 'C emission not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};