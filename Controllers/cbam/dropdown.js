const Country = require('../../Models/cbam/dropdown');


exports.listcncodes = async (req, res) => {
    try {
        const results = await Country.findAllCNcode();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listcncodesbygoodsid = async (req, res) => {
    try {
        const results = await Country.findByGoods(req.params.goods_id);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listcncodesById = async (req, res) => {
    try {
        const results = await Country.findCNcodeById(req.params.id);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listsrcelectconsumptions = async (req, res) => {
    try {
        const results = await Country.findAllSrcelectconsumptions();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listsrcefelectricitys = async (req, res) => {
    try {
        const results = await Country.findAllSrcefelectricitys();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listjustification = async (req, res) => {
    try {
        const results = await Country.findAllJustification();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listqtyassurances = async (req, res) => {
    try {
        const results = await Country.findAllQtyassurances();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listdataqlys = async (req, res) => {
    try {
        const results = await Country.findAllDataqlys();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listemissions = async (req, res) => {
    try {
        const results = await Country.findAllEmissions();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listefunits = async (req, res) => {
    try {
        const results = await Country.findAllEfunits();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listadunits = async (req, res) => {
    try {
        const results = await Country.findAllAdunits();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.putsrcefelectricitys = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await Country.putsrcefelectricitys({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
