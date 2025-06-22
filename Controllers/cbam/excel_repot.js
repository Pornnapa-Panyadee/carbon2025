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

exports.getExcelReportWithValues = async (req, res) => {
    const { report_id } = req.params;

    try {
        const metadata = await Excelreport.getAllExcelReportMeta();
        const enriched = [];

        for (const item of metadata) {
            const value = await Excelreport.getValueFromTable(
                item.table_db,
                item.variable,
                report_id
            );

            enriched.push({
                ...item,
                value
            });
        }

        res.json(enriched);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

