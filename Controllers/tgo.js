const Tgo = require('../Models/tgo');


exports.list = async (req, res) => {
    try {
        const results = await Tgo.findAlltgo();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.listcat = async (req, res) => {
    try {
        const results = await Tgo.findcat();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.listsub = async (req, res) => {
    try {
        const categories = req.params.tgo_ef_cat_id;
        const results = await Tgo.findsubcat(categories);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listEachsub = async (req, res) => {
    try {
        const categories = req.params.tgo_ef_cat_id;
        const subCategory = req.params.tgo_ef_subcat_id;
        const results = await Tgo.findEachcat(categories, subCategory);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};