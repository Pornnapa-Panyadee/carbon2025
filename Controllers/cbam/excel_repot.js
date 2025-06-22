const Excelreport = require('../../Models/cbam/excel_repot');


exports.readperIdreport = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Excelreport.readperIdreport(id);
        if (!result) return res.status(404).json({ message: 'Excel Report not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

