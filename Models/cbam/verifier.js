const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {

        let countryName = null;
        if (data.country_id) {
            const countryQuery = `SELECT name AS country_name FROM countries WHERE id = ?`;
            const [countryResult] = await db.query(countryQuery, [data.country_id]);
            if (countryResult.length > 0) {
                countryName = countryResult[0].country_name;
            }
        }

        // 2. เพิ่ม country_name เข้าไปใน object data
        data.country_name_v = countryName;

        const query = 'INSERT INTO verifiers SET ? ,created_at = NOW(), updated_at = NOW() ';
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const query = 'UPDATE verifiers SET ? WHERE id = ?';
        const [result] = await db.query(query, [data, data.id]);
        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM verifiers WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM verifiers WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    readperIddetail: async (id) => {
        const query = `
            SELECT 
                verifiers.*, 
                authorised_representatives.name AS authorised_name,
                authorised_representatives.email AS authorised_email,
                authorised_representatives.phone AS authorised_phone,
                authorised_representatives.fax AS authorised_fax
            FROM verifiers
            LEFT JOIN authorised_representatives 
                ON verifiers.authorized_rep_id = authorised_representatives.id
            WHERE verifiers.id = ?;
        `;
        const [result] = await db.query(query, [id]);
        return result;
    },


};

module.exports = Report;