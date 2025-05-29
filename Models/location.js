const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = require('../Config/db.js');

const locationModel = {
    findAllProvinces: (callback) => {
        const query = `SELECT * FROM provinces`;
        db.query(query, callback);
    },

    findDistrictsByProvince: (provinceName, callback) => {
        const queryProvince = `SELECT province_id FROM provinces WHERE province_name = ?`;

        db.query(queryProvince, [provinceName], (err, results) => {
            if (err) return callback(err);

            if (results.length === 0) {
                return callback(null, []); // ไม่เจอจังหวัด
            }

            const provinceId = results[0].province_id;

            const queryDistricts = `SELECT * FROM districts WHERE province_id = ?`;
            db.query(queryDistricts, [provinceId], callback);
        });
    },

    findSubDistrictsByDistrict: (provinceName, districtName, callback) => {
        const getProvinceIdQuery = `SELECT province_id FROM provinces WHERE province_name = ?`;
        const getDistrictIdQuery = `SELECT district_id FROM districts WHERE province_id = ? AND district_name = ?`;
        const getSubDistrictsQuery = `SELECT * FROM subdistricts WHERE district_id = ?`;

        db.query(getProvinceIdQuery, [provinceName], (err, [provinceRow]) => {
            if (err) return callback(err);
            if (!provinceRow) return callback(null, []);  // บรรทัดนี้ error ถ้า callback ไม่ได้ส่งเข้ามา

            db.query(getDistrictIdQuery, [provinceRow.province_id, districtName], (err, [districtRow]) => {
                if (err) return callback(err);
                if (!districtRow) return callback(null, []);

                db.query(getSubDistrictsQuery, [districtRow.district_id], callback);
            });
        });

    }

}

module.exports = locationModel;
