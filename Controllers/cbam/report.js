const Report = require('../../Models/cbam/report');


exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Report.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await Report.updateByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperID = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Report.readperID(id);
        if (!result) return res.status(404).json({ message: 'Report not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readperIDuser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Report.readperIDuser(id);
        if (!result) return res.status(404).json({ message: 'Company not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Report.deleteById(id);
        if (!result) return res.status(404).json({ message: 'Report not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteByReportId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Missing report ID' });
        }

        const result = await Report.deleteByAllReportId(id);

        res.json({
            message: result.message || 'Deleted report and related data successfully'
        });
    } catch (err) {
        console.error('Delete Report Error:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};