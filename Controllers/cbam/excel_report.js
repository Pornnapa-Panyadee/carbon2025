const Report = require('../../Models/cbam/excel_report');

exports.getExcelReportWithValues = async (req, res) => {
    const { id, sheet } = req.params;

    try {
        const metadata = await Report.getMetadataBySheet(sheet);
        if (!metadata.length) {
            return res.status(404).json({ message: 'Metadata not found for this sheet' });
        }

        const data = await Report.getAllDataByReportId(id);
        if (!data) return res.status(404).json({ message: 'Report not found' });

        const { report, tableData } = data;

        // แปลง routes และ amounts (string → array) เฉพาะ d_processes
        if (Array.isArray(tableData['d_processes'])) {
            tableData['d_processes'].forEach(row => {
                ['routes', 'amounts'].forEach(field => {
                    if (typeof row[field] === 'string') {
                        try {
                            row[field] = JSON.parse(row[field]);
                        } catch {
                            row[field] = [];
                        }
                    }
                });
            });
        }

        const metadataGrouped = {};

        metadata.forEach(item => {
            const table = item.table_db;
            const variable = item.variable?.trim();
            const dataInTable = tableData[table];
            const title = item.title || "  ";
            if (!metadataGrouped[title]) metadataGrouped[title] = [];

            // กรณีพิเศษ: d_processes.routes เป็น array
            if (table === 'd_processes' && variable === 'routes' && Array.isArray(dataInTable)) {
                const firstRow = dataInTable[0] || {};
                const routesArray = Array.isArray(firstRow.routes) ? firstRow.routes : [];
                metadataGrouped[title].push({ ...item, value: routesArray[0] || "" });
                return;
            }

            // แยก Route 1, Route 2, ...
            if (table === 'd_processes' && !variable && /^Route \d+$/.test(item.name) && Array.isArray(dataInTable)) {
                const firstRow = dataInTable[0] || {};
                const routesArray = Array.isArray(firstRow.routes) ? firstRow.routes : [];
                const idx = parseInt(item.name.replace(/\D/g, ""), 10) - 1;
                metadataGrouped[title].push({ ...item, value: routesArray[idx] || "" });
                return;
            }

            // ✅ กรณีพิเศษ: d_processes.amounts → cache ไว้
            if (table === 'd_processes' && variable === 'amounts' && Array.isArray(dataInTable)) {
                const firstRow = dataInTable[0] || {};
                cachedAmountsArray = Array.isArray(firstRow.amounts) ? firstRow.amounts : [];
                metadataGrouped[title].push({ ...item, value: cachedAmountsArray[0] || "" });
                return;
            }

            // ✅ กรณีพิเศษ: ใช้ amounts cache → Route 2 amounts, Route 3 amounts, ...
            if (!variable && /^Route \d+ amounts$/.test(item.name)) {
                const idx = parseInt(item.name.replace(/\D/g, ""), 10) - 1;
                metadataGrouped[title].push({ ...item, value: cachedAmountsArray[idx] || "" });
                return;
            }


            // ไม่มีข้อมูล หรือไม่มีคอลัมน์
            if (!variable || !dataInTable) {
                metadataGrouped[title].push({ ...item, value: "" });
                return;
            }

            // ข้อมูลมากกว่า 1 row
            if (Array.isArray(dataInTable) && dataInTable.length > 1) {
                dataInTable.forEach((row, idx) => {
                    const cellPrefix = item.cell?.match(/^[A-Z]+/)?.[0] || "";
                    const cellRowNum = item.cell?.match(/\d+$/);
                    const rowNum = cellRowNum ? parseInt(cellRowNum[0]) + idx : "";
                    const dynamicCell = cellPrefix + rowNum;

                    const subTitle = `${title} (${idx + 1})`;
                    if (!metadataGrouped[subTitle]) metadataGrouped[subTitle] = [];

                    metadataGrouped[subTitle].push({
                        ...item,
                        cell: dynamicCell,
                        value: row[variable] ?? "",
                    });
                });
                return;
            }

            // default: single row
            const row = Array.isArray(dataInTable) ? dataInTable[0] : dataInTable;
            metadataGrouped[title].push({
                ...item,
                value: row?.[variable] ?? "",
            });
        });

        // ลบ group ที่เป็น array ว่างเปล่า []
        for (const key in metadataGrouped) {
            if (
                Array.isArray(metadataGrouped[key]) &&
                metadataGrouped[key].length === 0
            ) {
                delete metadataGrouped[key];
            }
        }

        // จัดเรียง key ให้ title ที่ไม่มี (n) อยู่ท้ายสุด
        let sortedMetadataGrouped;

        if (sheet === "B_EmInst") {
            sortedMetadataGrouped = Object.keys(metadataGrouped)
                .sort((a, b) => {
                    const extractIndex = (str) => {
                        const match = str.match(/\((\d+)\)$/);
                        return match ? parseInt(match[1], 10) : Infinity; // ไม่มีเลขให้ใหญ่สุด
                    };

                    const aIndex = extractIndex(a);
                    const bIndex = extractIndex(b);

                    if (aIndex === bIndex) return a.localeCompare(b); // fallback ใช้ชื่อ
                    return aIndex - bIndex;
                })
                .reduce((acc, key) => {
                    acc[key] = metadataGrouped[key];
                    return acc;
                }, {});
        } else {
            // ไม่จัดเรียง แค่คัดลอกของเดิม
            sortedMetadataGrouped = metadataGrouped;
        }


        return res.json({
            listTable: Object.keys(tableData),
            metadataGrouped: sortedMetadataGrouped,
        });

    } catch (error) {
        console.error("❌ Error in getExcelReportWithValues:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
