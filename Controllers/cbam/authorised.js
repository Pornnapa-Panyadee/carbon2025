const Authorised = require('../../Models/cbam/authorised');


exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Authorised.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await Authorised.updateByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperId = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Authorised.readperId(id);
        if (!result) return res.status(404).json({ message: 'Authorised not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Authorised.deleteById(id);
        if (!result) return res.status(404).json({ message: 'Authorised not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



