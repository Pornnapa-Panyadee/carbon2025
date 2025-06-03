// Controllers/excel.js
const path = require('path');
const { runPythonExcel } = require('../Models/excel');

async function getExcel(req, res) {
    const { company_name, product_id } = req.params; // ← จะ error ถ้า req.params เป็น undefined

    try {
        const outputPath = await runPythonExcel(company_name, product_id);
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
}

module.exports = { getExcel };
