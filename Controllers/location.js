const Location = require('../Models/location');


exports.list = async (req, res) => {
    try {
        const results = await Location.findAllProvinces();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.listAmp = async (req, res) => {
    try {
        const provinceName = req.params.provinceName;
        const results = await Location.findDistrictsByProvince(provinceName);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.listTumbon = async (req, res) => {
    try {
        const provinceName = req.params.provinceName;
        const districtName = req.params.districtName;
        const results = await Location.findSubDistrictsByDistrict(provinceName, districtName);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};