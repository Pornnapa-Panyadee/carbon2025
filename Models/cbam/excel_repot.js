const db = require('../../Config/dbCbam.js');

const Report = {

    readperIdreport: async (id) => {
        const query = 'SELECT * FROM excel_reports WHERE sheet = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    getAllExcelReportMeta: async () => {
        const [rows] = await db.query('SELECT * FROM excel_reports');
        return rows;
    },
    getValueFromTable: async (table, column, report_id) => {
        const [rows] = await db.query(
            `SELECT ?? AS value FROM ?? WHERE report_id = ? LIMIT 1`,
            [column.trim(), table, report_id]
        );
        return rows[0]?.value || null;
    },


};

module.exports = Report;