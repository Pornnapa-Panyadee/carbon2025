const Country = require('../../Models/cbam/countries');


exports.list = async (req, res) => {
    try {
        const results = await Country.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
