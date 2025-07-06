const selfcollect = require('../Models/form_self_collect');
const SelfCollectEf = require('../Models/self_collect');


exports.create = async (req, res) => {
    try {
        const { input = [], output = [], ...mainData } = req.body;

        const result = await SelfCollectEf.create(mainData);
        const selfCollectId = result.insertId;
        await selfcollect.create(selfCollectId, [...input, ...output]);

        res.status(201).json({ message: 'Data inserted successfully', self_collect_id: selfCollectId });
    } catch (error) {
        console.error('Insert error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.read = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const results = await selfcollect.findById(id);
        if (!results || results.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const data = req.body;
        const result = await selfcollect.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ error: 'Not found or no changes made' });
        res.json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await selfcollect.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const company_id = req.params.company_id;
        const product_id = req.params.product_id;
        const results = await selfcollect.findByProductIdSelf(company_id, product_id);
        if (!results || !results.length) {
            return res.status(404).json({ message: 'Product and Company not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listselfcollect = async (req, res) => {
    try {
        const company_id = req.params.company_id;
        const results = await selfcollect.listselfcollect(company_id);
        if (!results || !results.length) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listSelfCollectId = async (req, res) => {
    try {
        const company_id = req.params.company_id;
        const self_collect_id = req.params.self_collect_id;
        const results = await selfcollect.listSelfCollectId(company_id, self_collect_id);
        if (!results || !results.length) {
            return res.status(404).json({ message: 'Product and Company not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSelfCollectItem = async (req, res) => {
    try {
        const item = req.body;

        // ตรวจสอบว่า id มีส่งมาหรือไม่
        if (!item.cfp_report43_selfcollect_efs_id) {
            return res.status(400).json({ message: 'Missing cfp_report43_selfcollect_efs_id' });
        }

        const result = await selfcollect.updateSelfCollectItem(item);

        // ตรวจสอบว่าแถวถูกอัปเดตหรือไม่
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item updated successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSelfCollect = async (req, res) => {
    try {
        const { self_collect_id } = req.params;

        if (!self_collect_id) {
            return res.status(400).json({ message: 'Missing self_collect_id' });
        }

        await selfcollect.deleteSelfCollect(self_collect_id);

        res.json({ message: 'Deleted self_collect_efs items successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createProcessSC = async (req, res) => {
    try {
        const data = req.body;
        const result = await SelfCollectEf.createProcessSC(data);
        res.status(201).json({ message: 'Created successfully SelfCollect Process', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readProcessSCByID = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await SelfCollectEf.readProcessSCByID(id);
        if (!result) return res.status(404).json({ message: 'SelfCollect Process not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProcessSCByID = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await SelfCollectEf.updateProcessSCByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProcessSCByID = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await SelfCollectEf.deleteProcessSCByID(id);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: 'SelfCollect Process not found' });
        }
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createItemSC = async (req, res) => {
    try {
        const data = req.body;
        const result = await selfcollect.createItemSC(data);
        res.status(201).json({ message: 'Created successfully SelfCollect Item', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.readItemSCByID = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await selfcollect.readItemSCByID(id);
        if (!result) return res.status(404).json({ message: 'SelfCollect Item not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItemSCByID = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const result = await selfcollect.updateItemSCByID({ ...data, id });
        res.status(200).json({ message: 'Updated successfully', id: id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItemSCByID = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await selfcollect.deleteItemSCByID(id);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: 'SelfCollect Item not found' });
        }
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.ListItemSCByProcess = async (req, res) => {
    try {
        const { company_id, id } = req.params;

        const selfCollect = await SelfCollectEf.getSelfCollectById(company_id, id);
        if (!selfCollect) {
            return res.status(404).json({ message: 'self_collect_efs not found' });
        }

        const items = await SelfCollectEf.getItemsBySelfCollectId(id);

        res.json({
            self_collect: selfCollect,
            items: items
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};