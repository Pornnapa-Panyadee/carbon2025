// Models/excel.js
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const db = require('../Config/db.js');


const ExcelModel = {
    runPythonPDF: async function (sheet, company_id, product_id) {
        let scriptPath;
        let dbColumn; // column DB สำหรับเก็บ Excel path

        // เลือก script และ column ตาม sheet
        if (sheet.toLowerCase() === 'fr01') {
            scriptPath = path.join(__dirname, '..', 'ExcelReport', 'python', 'runeExcel_FR1.py');
            dbColumn = 'path_excel_fr01';
        } else if (sheet.toLowerCase() === 'fr03') {
            scriptPath = path.join(__dirname, '..', 'ExcelReport', 'python', 'runeExcel_FR3.py');
            dbColumn = 'path_excel_fr03';
        } else if (sheet.toLowerCase() === 'fr041') {
            scriptPath = path.join(__dirname, '..', 'ExcelReport', 'python', 'runeExcel_FR41.py');
            dbColumn = 'path_excel_fr41';
        } else if (sheet.toLowerCase() === 'fr042') {
            scriptPath = path.join(__dirname, '..', 'ExcelReport', 'python', 'runeExcel_FR42.py');
            dbColumn = 'path_excel_fr42';
        } else {
            scriptPath = path.join(__dirname, '..', 'ExcelReport', 'python', 'runeExcel.py');
            dbColumn = 'path_excel';
        }

        // เรียก Python script
        const outputRaw = await new Promise((resolve, reject) => {
            const py = spawn('python', [scriptPath, company_id, product_id]);

            let stdoutData = '';
            let stderrData = '';

            py.stdout.on('data', (data) => { stdoutData += data.toString(); });
            py.stderr.on('data', (data) => { stderrData += data.toString(); });

            py.on('close', (code) => {
                if (code !== 0) return reject(new Error(`Python script error: ${stderrData}`));
                resolve(stdoutData);
            });
        });

        // filter stdout ให้เหลือเฉพาะไฟล์ Excel (.xlsx)
        const excelLines = outputRaw.split('\n')
            .map(l => l.trim())
            .filter(l => l.endsWith('.xlsx'));

        if (excelLines.length === 0) throw new Error('Excel export failed: no file generated');

        const outputPath = excelLines[excelLines.length - 1];  // ใช้ไฟล์ล่าสุด
        const fileName = path.basename(outputPath);
        const relativePath = `/download/${fileName}`;

        // ตรวจสอบ record
        const [existing] = await db.query(`
        SELECT * FROM company_excel_paths
        WHERE company_id = ? AND product_id = ?
    `, [company_id, product_id]);

        let record;
        if (existing.length > 0) {
            await db.query(`
            UPDATE company_excel_paths
            SET ${dbColumn} = ?, updated_at = NOW()
            WHERE company_id = ? AND product_id = ?
        `, [relativePath, company_id, product_id]);

            const [updated] = await db.query(`
            SELECT * FROM company_excel_paths
            WHERE company_id = ? AND product_id = ?
        `, [company_id, product_id]);
            record = updated[0];
        } else {
            await db.query(`
            INSERT INTO company_excel_paths (company_id, product_id, ${dbColumn}, created_at, updated_at)
            VALUES (?, ?, ?, NOW(), NOW())
        `, [company_id, product_id, relativePath]);

            const [inserted] = await db.query(`
            SELECT * FROM company_excel_paths
            WHERE company_id = ? AND product_id = ?
        `, [company_id, product_id]);
            record = inserted[0];
        }

        return [record];  // return array ตามเดิม
    },




    runPythonExcel: async function (company_name, product_id) {
        const query = 'SELECT scope FROM products WHERE product_id = ?';
        const [result] = await db.query(query, [product_id]);
        const scope = result ? result.scope : null;

        let scriptPath; // declare here

        if (scope === 'B2C') {
            scriptPath = path.join(__dirname, '..', 'ExcelReport', 'python', 'runeExcel_B2C.py');
        } else {
            scriptPath = path.join(__dirname, '..', 'ExcelReport', 'python', 'runeExcel.py');
        }

        return await new Promise((resolve, reject) => {
            const py = spawn('python', [scriptPath, company_name, product_id]);

            let outputPath = '';
            let errorOutput = '';

            py.stdout.on('data', (data) => {
                outputPath += data.toString();
            });

            py.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            py.on('close', (code) => {
                if (code !== 0) {
                    return reject(new Error(`Python script error: ${errorOutput}`));
                }
                resolve(outputPath.trim());
            });
        });
    },

    runPythonExcelCompany: async function (company_id, product_id) {
        const scriptPath = path.join(__dirname, '..', 'ExcelReport', 'python', 'runeExcel.py');

        const outputPath = await new Promise((resolve, reject) => {
            const py = spawn('python', [scriptPath, company_id, product_id]);

            let output = '';
            let errorOutput = '';

            py.stdout.on('data', (data) => {
                output += data.toString();
            });

            py.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            py.on('close', (code) => {
                if (code !== 0) {
                    return reject(new Error(`Python script error: ${errorOutput}`));
                }
                resolve(output.trim());
            });
        });

        const fileName = path.basename(outputPath);
        const relativePath = `/download/${fileName}`;

        // 🔍 ตรวจสอบก่อนว่า company_id + product_id นี้มีอยู่แล้วหรือไม่
        const [existing] = await db.query(`
            SELECT id FROM company_excel_paths
            WHERE company_id = ? AND product_id = ?
        `, [company_id, product_id]);

        if (existing.length > 0) {
            // 👉 มีอยู่แล้ว ให้ update
            await db.query(`
            UPDATE company_excel_paths
            SET path_excel = ?, updated_at = NOW()
            WHERE company_id = ? AND product_id = ?
        `, [relativePath, company_id, product_id]);
        } else {
            // 👉 ยังไม่มี ให้ insert ใหม่
            await db.query(`
            INSERT INTO company_excel_paths (company_id, product_id, path_excel, created_at, updated_at)
            VALUES (?, ?, ?, NOW(), NOW())
        `, [company_id, product_id, relativePath]);
        }

        return outputPath;
    },

    loadExcelByCompany: async function (company_id, product_id) {
        const query = 'SELECT * FROM company_excel_paths WHERE company_id = ? AND product_id = ?';
        const [result] = await db.query(query, [company_id, product_id]);
        return result;
    },

    copyExcelForAuditorWithVersion: async (auditor_id, product_id) => {
        const outputFolder = path.join(__dirname, '..', 'ExcelReport', 'output');
        // 1. ดึงข้อมูล path เดิมจาก company_excel_paths
        const [companyPaths] = await db.query(
            'SELECT * FROM company_excel_paths WHERE product_id = ?',
            [product_id]
        );

        if (companyPaths.length === 0) {
            throw new Error('Excel path not found for this product.');
        }

        const companyPath = companyPaths[0];
        const company_id = companyPath.company_id;
        const originalRelativePath = companyPath.path_excel;
        const originalFileName = path.basename(originalRelativePath);

        const sourcePath = path.join(outputFolder, originalFileName);

        const [existingVersions] = await db.query(
            `SELECT version FROM auditor_excel_paths WHERE auditor_id = ? AND product_id = ?`,
            [auditor_id, product_id]
        );

        // หา version สูงสุดที่เป็นตัวเลข
        let maxVersion = 0;
        existingVersions.forEach(row => {
            const num = Number(row.version);
            if (!isNaN(num) && num > maxVersion) {
                maxVersion = num;
            }
        });

        const newVersionNumber = maxVersion + 1;
        const newFileName = `version${newVersionNumber}_${originalFileName}`;
        const destPath = path.join(outputFolder, newFileName);

        fs.copyFileSync(sourcePath, destPath);

        const relativePath = `/download/${newFileName}`;

        await db.query(
            `INSERT INTO auditor_excel_paths 
         (auditor_id, company_id, product_id, path_excel, version, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [auditor_id, company_id, product_id, relativePath, newVersionNumber]
        );

        return relativePath;
    },

    loadExcelByAuditor: async function (auditor_id, product_id) {
        const query = 'SELECT * FROM auditor_excel_paths WHERE auditor_id = ? AND product_id = ? ORDER BY created_at DESC';
        const [result] = await db.query(query, [auditor_id, product_id]);
        return result;
    },

}
module.exports = ExcelModel;

