const db = require('../../Config/dbCbam.js');

async function getTableColumns(tableName) {
    const [columns] = await db.query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
    `, [tableName]);

    const template = {};
    for (const col of columns) {
        template[col.COLUMN_NAME] = "";
    }
    return template;
}

const Report = {
    getMetadataBySheet: async (sheet) => {
        const [rows] = await db.query(`SELECT * FROM excel_reports WHERE sheet = ?`, [sheet]);
        return rows;
    },

    getReportById: async (id) => {
        const [rows] = await db.query(`SELECT * FROM reports WHERE id = ?`, [id]);
        return rows[0] || null;
    },

    getTableDataOrDefault: async (table, column, id) => {
        const [rows] = await db.query(`SELECT * FROM ?? WHERE ?? = ?`, [table, column, id]);

        if (rows.length === 0) {
            return await getTableColumns(table);
        }
        return rows.length === 1 ? rows[0] : rows;
    },

    getAllDataByReportId: async (reportId) => {
        const mapTableToIdColumn = {
            installations: 'id',
            verifiers: 'id',
            authorised_representatives: 'id'
        };

        const reportIdTables = ['d_processes', 'e_precursors', 'b_emission_installations', 'c_emission_energies'];

        const report = await Report.getReportById(reportId);
        if (!report) return null;

        const tableData = {};

        for (const [table, col] of Object.entries(mapTableToIdColumn)) {
            let queryId;

            if (table === 'installations') {
                queryId = report.installation_id;
            } else if (table === 'verifiers') {
                queryId = report.verifier_id;
            } else if (table === 'authorised_representatives') {
                if (!tableData.verifiers) {
                    tableData.verifiers = await Report.getTableDataOrDefault('verifiers', 'id', report.verifier_id);
                }
                queryId = tableData.verifiers.authorized_rep_id;
            }

            if (!queryId) {
                tableData[table] = await getTableColumns(table);
            } else {
                tableData[table] = await Report.getTableDataOrDefault(table, col, queryId);
            }
        }

        for (const table of reportIdTables) {
            const [rows] = await db.query(`SELECT * FROM ?? WHERE report_id = ?`, [table, reportId]);

            if (rows.length === 0) {
                tableData[table] = await getTableColumns(table);
            } else {
                // แปลง JSON string เป็น array สำหรับ 'routes' และ 'amounts' ใน d_processes
                if (table === 'd_processes') {
                    rows.forEach(row => {
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

                tableData[table] = rows;
            }
        }

        return { report, tableData };
    }
};

module.exports = Report;
