const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../Config/db.js');

const locationModel = {
    findAllProvinces: async () => {
        const [rows] = await db.query(`SELECT * FROM provinces`);
        return rows;
    },

    findDistrictsByProvince: async (provinceName) => {
        const [provinces] = await db.query(`SELECT province_id FROM provinces WHERE province_name = ?`, [provinceName]);
        if (!provinces.length) return [];
        const provinceId = provinces[0].province_id;
        const [districts] = await db.query(`SELECT * FROM districts WHERE province_id = ?`, [provinceId]);
        return districts;
    },

    findSubDistrictsByDistrict: async (provinceName, districtName) => {
        const [provinces] = await db.query(`SELECT province_id FROM provinces WHERE province_name = ?`, [provinceName]);
        if (!provinces.length) return [];
        const provinceId = provinces[0].province_id;

        const [districts] = await db.query(
            `SELECT district_id FROM districts WHERE province_id = ? AND district_name = ?`,
            [provinceId, districtName]
        );
        if (!districts.length) return [];
        const districtId = districts[0].district_id;

        const [subdistricts] = await db.query(
            `SELECT * FROM subdistricts WHERE district_id = ?`,
            [districtId]
        );
        return subdistricts;
    }
};

module.exports = locationModel;
