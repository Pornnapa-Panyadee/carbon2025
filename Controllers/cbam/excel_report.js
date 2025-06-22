const Report = require('../../Models/cbam/excel_report');

exports.getExcelReportWithValues = async (req, res) => {
    const { id, sheet } = req.params;  // สมมติส่งทั้ง id (report_id) กับ sheet มาด้วย

    try {
        // ดึง metadata ตาม sheet
        const metadata = await Report.getMetadataBySheet(sheet);
        if (!metadata.length) {
            return res.status(404).json({ message: 'Metadata not found for this sheet' });
        }

        // ดึงข้อมูล report และ table ต่าง ๆ
        const data = await Report.getAllDataByReportId(id);
        if (!data) return res.status(404).json({ message: 'Report not found' });

        const { report, tableData } = data;

        // เติมค่า value ให้ metadata
        metadata.forEach(item => {
            const table = item.table_db;
            const column = item.variable?.trim();

            if (!column || !tableData[table]) {
                item.value = "";
                return;
            }

            const dataInTable = tableData[table];

            if (Array.isArray(dataInTable)) {
                // ถ้าเป็น array (หลายแถว) ให้รวมค่า column ทุกแถว
                item.value = dataInTable.map(row => row[column] ?? "").join(", ");
            } else {
                // เป็น object แถวเดียว
                item.value = dataInTable[column] ?? "";
            }
        });

        return res.json({
            listTable: Object.keys(tableData),
            metadata,
            report,
            tableData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
