// Models/excel.js
const { spawn } = require('child_process');
const path = require('path');

exports.runPythonExcel = function (company_name, product_id) {
    return new Promise((resolve, reject) => {

        const scriptPath = path.join(__dirname, '..', 'ExcelReport', 'python', 'runeExcel.py');
        const py = spawn('python', [scriptPath, company_name, product_id]);
        // const py = spawn('python3', ['runExcel.py', company_name, product_id]);

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
};
