const adminData = require('../Models/admin');

// ฟังก์ชันช่วยจัดการ handler แบบยืดหยุ่น
const handler = (fn, getArgs) => async (req, res) => {
    try {
        const args = getArgs ? getArgs(req) : [];
        const result = await fn(...args);

        if (!result) return res.status(404).json({ message: 'Data not found' });

        if (fn.name.startsWith('create')) return res.json({ id: result.insertId });
        if (fn.name.startsWith('delete')) return res.json({ message: 'Deleted successfully', id: req.params.id });
        if (fn.name.startsWith('update')) return res.json({ message: 'Updated successfully', id: req.params.id });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// dashbard
exports.listDashboard = handler(adminData.listDashboard);


// Round
exports.listRound = handler(adminData.listRound);
exports.createRound = handler(adminData.createRound, req => [req.body]);
exports.listRoundId = handler(adminData.listRoundId, req => [req.params.id]);
exports.updateRoundId = handler(adminData.updateRoundId, req => [{ ...req.body, id: req.params.id }]);
exports.deleteRoundId = handler(adminData.deleteRoundId, req => [req.params.id]);

// Unit
exports.listUnit = handler(adminData.listUnit);
exports.createUnit = handler(adminData.createUnit, req => [req.body]);
exports.listUnitId = handler(adminData.listUnitId, req => [req.params.id]);
exports.updateUnitId = handler(adminData.updateUnitId, req => [{ ...req.body, id: req.params.id }]);
exports.deleteUnitId = handler(adminData.deleteUnitId, req => [req.params.id]);

// PCR 
exports.listPCR = handler(adminData.listPCR);
exports.createPCR = handler(adminData.createPCR, req => [req.body]);
exports.listPCRId = handler(adminData.listPCRId, req => [req.params.id]);
exports.updatePCRId = handler(adminData.updatePCRId, req => [{ ...req.body, id: req.params.id }]);
exports.deletePCRId = handler(adminData.deletePCRId, req => [req.params.id]);

//Industrial
exports.listIndustrial = handler(adminData.listIndustrial);
exports.createIndustrial = handler(adminData.createIndustrial, req => [req.body]);
exports.listIndustrialId = handler(adminData.listIndustrialId, req => [req.params.id]);
exports.updateIndustrialId = handler(adminData.updateIndustrialId, req => [{ ...req.body, id: req.params.id }]);
exports.deleteIndustrialId = handler(adminData.deleteIndustrialId, req => [req.params.id]);

//TGOef
exports.listTGOef = handler(adminData.listTGOef);
exports.createTGOef = handler(adminData.createTGOef, req => [req.body]);
exports.listTGOefId = handler(adminData.listTGOefId, req => [req.params.id]);
exports.updateTGOefId = handler(adminData.updateTGOefId, req => [{ ...req.body, id: req.params.id }]);
exports.deleteTGOefId = handler(adminData.deleteTGOefId, req => [req.params.id]);

exports.listTGOefCategories = handler(adminData.listTGOefCategories);
exports.listTGOefSubCategories = handler(adminData.listTGOefSubCategories);

exports.listCompanies = handler(adminData.listCompanies);
exports.listCompanyId = handler(adminData.listCompanyId, req => [req.params.id]);
exports.deleteCompanyId = handler(adminData.deleteCompanyId, req => [req.params.id]);