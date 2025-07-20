// Controllers/excel.js
const path = require('path');
// const fs = require('fs');
// const { runPythonExcel } = require('../Models/excel');
const Excel = require('../Models/excel');


exports.getExcel = async (req, res) => {
    const { company_name, product_id } = req.params;

    try {
        const outputPath = await Excel.runPythonExcel(company_name, product_id);
        const fileName = path.basename(outputPath);

        res.send(`
            <html>
                <body>
                    <h3>Excel file for ${company_name} - ${product_id}</h3>
                    <a href="/download/${fileName}" download>Download Excel File</a>
                </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getExcelByCompany = async (req, res) => {
    const { company_id, product_id } = req.params;

    try {
        const outputPath = await Excel.runPythonExcelCompany(company_id, product_id);
        const fileName = path.basename(outputPath);
        res.status(201).json({ message: 'Company created', companyId: outputPath.insertId });

        // if (!fs.existsSync(outputPath)) {
        //     return res.status(404).send('Excel file not found.');
        // }
        // console.log(`Excel file generated at: ${outputPath}`);

    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
};

exports.loadExcelByCompany = async (req, res) => {
    try {
        const company_id = req.params.company_id;
        const product_id = req.params.product_id;
        const result = await Excel.loadExcelByCompany(company_id, product_id);
        if (!result) return res.status(404).json({ message: 'Excel not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getExcelByAuditor = async (req, res) => {
    const { auditor_id, product_id } = req.params;

    try {
        const relativePath = await Excel.copyExcelForAuditorWithVersion(auditor_id, product_id);
        res.json({
            message: 'Excel copied with new version and path saved.',
            download_url: relativePath
        });
    } catch (error) {
        console.error('Error in getExcelByAuditor:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.loadExcelByAuditor = async (req, res) => {
    try {
        const auditor_id = req.params.auditor_id;
        const product_id = req.params.product_id;
        const result = await Excel.loadExcelByAuditor(auditor_id, product_id);
        if (!result) return res.status(404).json({ message: 'Excel not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

