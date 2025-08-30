const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        const [processRows] = await db.query(
            'SELECT * FROM d_processes WHERE report_id = ?',
            [data.report_id]
        );

        // ถ้าไม่มี row หรือค่ามันเป็น null/undefined ให้ใช้ 1 แทน
        const totalProcess = Number(processRows?.[0]?.total_consumed_within_installation) || Number(data.total_consumed_within_installation);

        const consumed = Number(data.total_consumed_within_installation);
        const directValue = Number(data.embedded_direct_emissions_value);
        const indirectValue = Number(data.embedded_indirection_emissions_value);

        const SEE_direct = (consumed / totalProcess) * directValue;
        const SEE_indirect = (consumed / totalProcess) * indirectValue;
        const SEE_total = SEE_direct + SEE_indirect;
        // SEE_direct = totalProcess;

        const insertData = {
            ...data,
            SEE_direct,
            SEE_indirect,
            SEE_total
        };

        const query = 'INSERT INTO e_precursors SET ?, created_at = NOW(), updated_at = NOW() ';
        const [result] = await db.query(query, insertData);
        return result;
    },

    updateByID: async (data) => {
        const [processRows] = await db.query(
            'SELECT * FROM d_processes WHERE report_id = ?',
            [data.report_id]
        );
        const totalProcess = Number(processRows[0].total_consumed_within_installation) || Number(data.total_consumed_within_installation);
        const consumed = Number(data.total_consumed_within_installation);
        const directValue = Number(data.embedded_direct_emissions_value);
        const indirectValue = Number(data.embedded_indirection_emissions_value);

        const SEE_direct = (consumed / totalProcess) * directValue;
        const SEE_indirect = (consumed / totalProcess) * indirectValue;
        const SEE_total = SEE_direct + SEE_indirect;
        // SEE_direct = totalProcess;

        const insertData = {
            ...data,
            SEE_direct,
            SEE_indirect,
            SEE_total
        };

        const query = 'UPDATE e_precursors SET ? , updated_at = NOW() WHERE id = ? ';
        const [result] = await db.query(query, [insertData, data.id]);
        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM e_precursors WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM e_precursors WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    readperIdreport: async (id) => {
        const query = 'SELECT * FROM e_precursors WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteByIdreport: async (id) => {
        const query = 'DELETE FROM e_precursors WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },

};

module.exports = Report;