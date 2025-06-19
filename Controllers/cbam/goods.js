const Goods = require('../../Models/cbam/goods');


exports.list = async (req, res) => {
    try {
        const results = await Goods.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listAll = async (req, res) => {
    try {
        const results = await Goods.findGoods();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.listByName = async (req, res) => {
    try {
        const results = await Goods.findByName(req.params.id);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listByRoutes = async (req, res) => {
    try {
        const results = await Goods.findByRoutes(req.params.id);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listByRelevantPrecursors = async (req, res) => {
    try {
        const results = await Goods.findByRelevantPrecursors(req.params.name);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};