const db = require('../../Config/dbCbam.js');

const Report = {
    create: async (data) => {
        const query = `
            INSERT INTO reports 
            SET ?, 
            created_at = NOW(), 
            updated_at = NOW()
        `;
        const [result] = await db.query(query, data);
        return result;
    },
    updateByID: async (data) => {
        const query = 'UPDATE reports SET ? WHERE id = ?';
        const [result] = await db.query(query, [data, data.id]);
        return result;
    },
    readperID: async (id) => {
        const query = `
            SELECT 
                r.*, 
                i.name AS installation_name,
                v.name AS verifier_name,
                it.name AS industry_type_name,
                gc.name AS goods_category_name,
                cn.name AS name,
                d.id AS d_processes_id
            FROM reports r
            LEFT JOIN installations i ON r.installation_id = i.id
            LEFT JOIN verifiers v ON r.verifier_id = v.id
            LEFT JOIN industry_types it ON r.industry_type_id = it.industry_id
            LEFT JOIN goods_categories gc ON r.goods_id = gc.goods_id
            LEFT JOIN cn_codes cn ON r.cn_id = cn.cn_id
            LEFT JOIN d_processes d ON r.id = d.report_id
            WHERE r.id = ?
        `;
        const [result] = await db.query(query, [id]);
        return result;
    },

    readperIDuser: async (id) => {

        const query = `
            SELECT 
                r.*, 
                i.name AS installation_name,
                v.name AS verifier_name,
                it.name AS industry_type_name,
                gc.name AS goods_category_name,
                cn.name AS name,
                cn.cn_code AS cncode

            FROM reports r
            LEFT JOIN installations i ON r.installation_id = i.id
            LEFT JOIN verifiers v ON r.verifier_id = v.id
            LEFT JOIN industry_types it ON r.industry_type_id = it.industry_id
            LEFT JOIN goods_categories gc ON r.goods_id = gc.goods_id
            LEFT JOIN cn_codes cn ON r.cn_id = cn.cn_id
            WHERE r.company_id = ?
        `;

        const [result] = await db.query(query, [id]);
        return result;
    },

    deleteById: async (id) => {
        const query = 'DELETE FROM reports WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result;
    },

    deleteByAllReportId: async (id) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // ดึงข้อมูล report ก่อน เพื่อนำ id ไปลบ installations, verifiers, etc.
            const [[report]] = await connection.query('SELECT * FROM reports WHERE id = ?', [id]);
            if (!report) throw new Error('Report not found');

            const installation_id = report.installation_id;
            const verifier_id = report.verifier_id;

            // ดึง authorised_rep_id จาก verifier ก่อน
            let authorised_rep_id = null;
            if (verifier_id) {
                const [[verifier]] = await connection.query('SELECT * FROM verifiers WHERE id = ?', [verifier_id]);
                if (verifier) {
                    authorised_rep_id = verifier.authorized_rep_id;
                }
            }

            // 1. ลบข้อมูลลูกที่ใช้ report_id
            await connection.query('DELETE FROM b_emission_installations WHERE report_id = ?', [id]);
            await connection.query('DELETE FROM c_emission_energies WHERE report_id = ?', [id]);
            await connection.query('DELETE FROM d_processes WHERE report_id = ?', [id]);
            await connection.query('DELETE FROM e_precursors WHERE report_id = ?', [id]);

            // 2. ลบ report (ตารางแม่)
            await connection.query('DELETE FROM reports WHERE id = ?', [id]);

            // 3. ลบ verifier
            if (verifier_id) {
                await connection.query('DELETE FROM verifiers WHERE id = ?', [verifier_id]);
            }

            // 4. ลบ authorised representative
            if (authorised_rep_id) {
                await connection.query('DELETE FROM authorised_representatives WHERE id = ?', [authorised_rep_id]);
            }

            // 5. ลบ installation
            if (installation_id) {
                await connection.query('DELETE FROM installations WHERE id = ?', [installation_id]);
            }

            await connection.commit();
            return { message: 'Deleted report and related data successfully' };
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    },

    readsumaryperId: async (id) => {
        const query = `
            SELECT 
                r.installation_id,r.industry_type_id,r.goods_id,
                i.name AS installation_name,
                v.name AS verifier_name,
                it.name AS industry_type_name,
                gc.name AS goods_category_name,
                cn.name AS cn_name,
                cn.cn_code AS cn_code,
                d.name AS product_name
            FROM reports r
            LEFT JOIN installations i ON r.installation_id = i.id
            LEFT JOIN verifiers v ON r.verifier_id = v.id
            LEFT JOIN industry_types it ON r.industry_type_id = it.industry_id
            LEFT JOIN goods_categories gc ON r.goods_id = gc.goods_id
            LEFT JOIN cn_codes cn ON r.cn_id = cn.cn_id
            LEFT JOIN d_processes d ON r.id = d.report_id
            WHERE r.id = ?
        `;
        const [result] = await db.query(query, [id]);

        const query1 = `
                SELECT 
                    (d.SEE_direct + SUM(e.SEE_direct)) AS SEE_direct_sum,
                    (d.SEE_indirect + SUM(e.SEE_indirect)) AS SEE_indirect_sum,
                    (d.SEE_total + SUM(e.SEE_total)) AS SEE_total_sum
                FROM d_processes d
                LEFT JOIN e_precursors e 
                    ON d.report_id = e.report_id
                WHERE d.report_id = ?
                GROUP BY d.SEE_direct, d.SEE_indirect, d.SEE_total
            `;
        const [d_processes] = await db.query(query1, [id]);
        const insertData = {
            'data': result,
            'sum': d_processes,
            'unit': [{
                "SEE_direct_sum": "tCO2e/t",
                "SEE_indirect_sum": "tCO2e/t",
                "SEE_total_sum": "tCO2e/t"
            }],
        };

        return insertData;
    },

    readDashboardPerId: async (company_id) => {
        const query = `
        SELECT 
            r.id AS report_id,
            r.installation_id,
            r.industry_type_id,
            r.updated_at,
            r.goods_id,
            i.name AS installation_name,
            v.name AS verifier_name,
            it.name AS industry_type_name,
            gc.name AS goods_category_name,
            cn.name AS cn_name,
            cn.cn_code AS cn_code,
            d.name AS product_name
        FROM reports r
        LEFT JOIN installations i ON r.installation_id = i.id
        LEFT JOIN verifiers v ON r.verifier_id = v.id
        LEFT JOIN industry_types it ON r.industry_type_id = it.industry_id
        LEFT JOIN goods_categories gc ON r.goods_id = gc.goods_id
        LEFT JOIN cn_codes cn ON r.cn_id = cn.cn_id
        LEFT JOIN d_processes d ON r.id = d.report_id
        WHERE r.company_id = ?
    `;
        const [result] = await db.query(query, [company_id]);

        const query1 = `
        SELECT 
            d.report_id,
            (d.SEE_direct + IFNULL(SUM(e.SEE_direct),0)) AS SEE_direct_sum,
            (d.SEE_indirect + IFNULL(SUM(e.SEE_indirect),0)) AS SEE_indirect_sum,
            (d.SEE_total + IFNULL(SUM(e.SEE_total),0)) AS SEE_total_sum
        FROM d_processes d
        LEFT JOIN e_precursors e 
            ON d.report_id = e.report_id
        LEFT JOIN reports r ON d.report_id = r.id
        WHERE r.company_id = ?
        GROUP BY d.report_id, d.SEE_direct, d.SEE_indirect, d.SEE_total
    `;
        const [sumRows] = await db.query(query1, [company_id]);

        // แปลง sumRows เป็น map ตาม report_id
        const sumMap = {};
        sumRows.forEach(row => {
            sumMap[row.report_id] = {
                SEE_direct_sum: row.SEE_direct_sum,
                SEE_indirect_sum: row.SEE_indirect_sum,
                SEE_total_sum: row.SEE_total_sum
            };
        });

        // Merge sum ตาม report_id
        const mergedData = result.map(row => ({
            ...row,
            ...(sumMap[row.report_id] || {
                SEE_direct_sum: 0,
                SEE_indirect_sum: 0,
                SEE_total_sum: 0
            })
        }));

        return mergedData;
    },



};

module.exports = Report;