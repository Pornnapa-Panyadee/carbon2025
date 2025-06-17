const mysql = require('mysql2');

const db = require('../Config/db.js');

const dropDownModel = {
    findAllUnit: async () => {
        const [rows] = await db.query(`SELECT * FROM units`);
        return rows;
    },

}

module.exports = dropDownModel;