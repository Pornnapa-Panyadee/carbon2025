const Form41 = require('../Models/form4_1');

// Item
exports.create_item = async (req, res) => {
    try {
        const data = req.body;
        const result = await Form41.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.read_item = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const results = await Form41.findById(id);
        if (!results || results.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update_item = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const data = req.body;
        const result = await Form41.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ error: 'Not found or no changes made' });
        res.json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove_item = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await Form41.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Sum
exports.create_sum = async (req, res) => {
    try {
        const { product_id } = req.body;
        if (!product_id) {
            return res.status(400).json({ message: "product_id is required" });
        }

        // เรียกใช้ฟังก์ชัน createSum ใน model
        const result = await Form41.createSum({ product_id });

        return res.status(200).json({
            message: "Calculation successful",
            id: result.report41_sum_id
        });
    } catch (error) {
        console.error("createSum error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.read_sum = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const results = await Form41.findByIdSum(id);
        if (!results || results.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update_sum = async (req, res) => {
    try {
        const { report41_sum_id, product_id } = req.body;
        if (!report41_sum_id || !product_id) {
            return res.status(400).json({ message: "report41_sum_id and product_id are required" });
        }

        const result = await Form41.updateByIdSum({ report41_sum_id, product_id });

        return res.status(200).json({
            message: "Sum updated successfully",
            data: result
        });

    } catch (error) {
        console.error("updateSum error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.remove_sum = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await Form41.deleteByIdSum(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.read_form = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await Form41.getFormById(id);
        if (!result) return res.status(404).json({ error: 'Not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.read_formweb = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await Form41.getFormByIdweb(id);
        if (!result) return res.status(404).json({ error: 'Not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.read_f03 = async (req, res) => {
    try {
        const company_id = parseInt(req.params.company_id, 10);
        const product_id = parseInt(req.params.product_id, 10);
        const results = await Form41.setInputFr04(company_id, product_id);
        if (!results || !results.length) {
            return res.status(404).json({ message: 'Product and Company not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.readByItem = async (req, res) => {
    const { life_cycle_phase, company_id, product_id, class: className, item_id } = req.params;

    try {
        const result = await Form41.readByItem({
            life_cycle_phase,
            company_id,
            product_id,
            className,
            item_id
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};