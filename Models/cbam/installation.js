const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        // 1. Query หาชื่อประเทศจาก countries
        let countryName = null;
        if (data.country_id) {
            const countryQuery = `SELECT name AS country_name FROM countries WHERE id = ?`;
            const [countryResult] = await db.query(countryQuery, [data.country_id]);
            if (countryResult.length > 0) {
                countryName = countryResult[0].country_name;
            }
        }

        // 2. เพิ่ม country_name เข้าไปใน object data
        data.country_name = countryName;

        // 3. INSERT ลงตาราง installations
        const insertQuery = `INSERT INTO installations SET ?, created_at = NOW(), updated_at = NOW()`;
        const [insertResult] = await db.query(insertQuery, data);

        // 4. Return ผลลัพธ์รวม country_name
        return {
            insertId: insertResult.insertId,
            ...data
        };
    },
    updateByID: async (data) => {
        const query = 'UPDATE installations SET ? WHERE id = ?';
        const [result] = await db.query(query, [data, data.id]);
        return result;
    },
    readperId: async (id) => {
        const query = 'SELECT * FROM installations WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },
    readAll: async () => {
        const query = 'SELECT * FROM installations ';
        const [result] = await db.query(query);
        return result;
    },
    deleteById: async (id) => {
        const query = 'DELETE FROM installations WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    }

};

module.exports = Report;