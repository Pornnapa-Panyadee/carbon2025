const db = require('../../Config/dbCbam.js');

const Report = {

    readperIdreport: async (id) => {
        const query = 'SELECT * FROM excel_reports WHERE sheet = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
};

module.exports = Report;