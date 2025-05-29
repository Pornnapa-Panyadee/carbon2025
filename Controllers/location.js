const Location = require('../Models/location');


exports.list = async (req, res) => {
    Location.findAllProvinces((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};


exports.listAmp = async (req, res) => {
    const provinceName = req.params.provinceName;
    Location.findDistrictsByProvince(provinceName, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};;


exports.listTumbon = async (req, res) => {
    const provinceName = req.params.provinceName;
    const districtName = req.params.districtName;
    Location.findSubDistrictsByDistrict(provinceName, districtName, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};