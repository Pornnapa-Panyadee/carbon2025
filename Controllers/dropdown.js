const dropdown = require('../Models/dropdown');


exports.list = async (req, res) => {
    try {
        const results = await dropdown.findAllUnit();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listIndustrials = async (req, res) => {
    try {
        const results = await dropdown.listIndustrials();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};