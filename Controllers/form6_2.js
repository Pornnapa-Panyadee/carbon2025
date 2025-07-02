const Form62 = require('../Models/form6_2');


exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Form62.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await Form62.updateByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperId = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Form62.readperId(id);
        if (!result) return res.status(404).json({ message: 'Form62 not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Form62.deleteById(id);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: 'Form62 not found' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.readperIdreport = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Form62.readperIdreport(id);
        if (!result) return res.status(404).json({ message: 'Form62 not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
