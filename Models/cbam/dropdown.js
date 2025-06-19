const db = require('../../Config/dbCbam.js');

const dropDownModel = {
    findAllCNcode: async () => {
        const [rows] = await db.query(`SELECT * FROM cn_codes`);
        return rows;
    },
    findAllSrcelectconsumptions: async () => {
        const [rows] = await db.query(`SELECT * FROM src_electricity_comsuptions`);
        return rows;
    },
    findAllSrcefelectricitys: async () => {
        const [rows] = await db.query(`SELECT * FROM src_ef_electricitys`);
        return rows;
    },
    findAllJustification: async () => {
        const [rows] = await db.query(`SELECT * FROM just_for_use_data_values`);
        return rows;
    },
    findAllQtyassurances: async () => {
        const [rows] = await db.query(`SELECT * FROM info_qty_assurances`);
        return rows;
    },
    findAllDataqlys: async () => {
        const [rows] = await db.query(`SELECT * FROM gen_info_data_qlys`);
        return rows;
    },
    findAllEmissions: async () => {
        const [rows] = await db.query(`SELECT * FROM emission_methods`);
        return rows;
    },
    findAllEfunits: async () => {
        const [rows] = await db.query(`SELECT * FROM ef_units`);
        return rows;
    },
    findAllAdunits: async () => {
        const [rows] = await db.query(`SELECT * FROM ad_units`);
        return rows;
    }

};

module.exports = dropDownModel;
