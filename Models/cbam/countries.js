const db = require('../../Config/dbCbam.js');

const locationModel = {
    findAll: async () => {
        const [rows] = await db.query(`SELECT * FROM countries`);
        return rows;
    },

};

module.exports = locationModel;
