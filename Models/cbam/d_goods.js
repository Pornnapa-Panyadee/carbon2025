const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        const SEE_direct = (data.direct_emissions + (data.ef_imported_heat * data.imported_heat_value) + (data.imported_wgases_amount * 56.1) - (data.exported_wgases_amount * 37.4187)) / data.total_consumed_within_installation
        const SEE_indirect = (data.electricity_consumption_value * data.ef_electricity) / data.total_consumed_within_installation
        const SEE_total = SEE_direct + SEE_indirect;
        const insertData = {
            ...data,
            SEE_direct,
            SEE_indirect,
            SEE_total
        };

        const query = 'INSERT INTO d_processes SET ?, created_at = NOW(), updated_at = NOW() ';
        const [result] = await db.query(query, insertData);
        return result;
    },
    updateByID: async (data) => {
        const totalConsumed = Number(data.total_consumed_within_installation) || 0;

        const directEmissions = Number(data.direct_emissions) || 0;
        const efImportedHeat = Number(data.ef_imported_heat) || 0;
        const importedHeatValue = Number(data.imported_heat_value) || 0;
        const importedWgases = Number(data.imported_wgases_amount) || 0;
        const exportedWgases = Number(data.exported_wgases_amount) || 0;
        const elecConsumption = Number(data.electricity_consumption_value) || 0;
        const efElectricity = Number(data.ef_electricity) || 0;

        let SEE_direct = 0;
        let SEE_indirect = 0;
        let SEE_total = 0;

        if (totalConsumed > 0) {
            SEE_direct = (
                directEmissions +
                (efImportedHeat * importedHeatValue) +
                (importedWgases * 56.1) -
                (exportedWgases * 37.4187)
            ) / totalConsumed;

            SEE_indirect = (
                elecConsumption * efElectricity
            ) / totalConsumed;

            SEE_total = SEE_direct + SEE_indirect;
        }

        const insertData = {
            ...data,
            SEE_direct,
            SEE_indirect,
            SEE_total
        };

        const query = 'UPDATE d_processes SET ? WHERE id = ?';
        const [result] = await db.query(query, [insertData, data.id]);
        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM d_processes WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM d_processes WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    readperIdreport: async (id) => {
        const query = 'SELECT * FROM d_processes WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteByIdreport: async (id) => {
        const query = 'DELETE FROM d_processes WHERE report_id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },

};

module.exports = Report;