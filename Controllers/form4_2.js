const Form42 = require('../Models/form4_2');

// Item
exports.create_item = async (req, res) => {
    try {
        const data = req.body;
        const result = await Form42.create(data);
        res.status(201).json({ message: 'Created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.read_item = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const results = await Form42.findById(id);
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
        const result = await Form42.updateById(id, data);
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
        const result = await Form42.deleteById(id);
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

        const result = await Form42.createSum({ product_id });
        return res.status(200).json({ message: "Sum42 created/updated successfully", id: result.report42_sum_id });

    } catch (error) {
        console.error("createSum42 error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.read_sum = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const results = await Form42.findByIdSum(id);
        if (!results || results.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update_sum = async (req, res) => {
    try {
        const { report42_sum_id, product_id } = req.body;

        if (!report42_sum_id || !product_id) {
            return res.status(400).json({ message: "report42_sum_id and product_id are required" });
        }

        const result = await Form42.updateByIdSum({ report42_sum_id, product_id });

        return res.status(200).json({
            message: "Sum42 updated successfully",
            data: result
        });

    } catch (error) {
        console.error("updateSum42 error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.remove_sum = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await Form42.deleteByIdSum(id);
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
        const result = await Form42.getFormById(id);
        if (!result) return res.status(404).json({ error: 'Not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.readByItem = async (req, res) => {
    const { life_cycle_phase, company_id, product_id, class: className, item_id } = req.params;

    try {
        const result = await Form42.readByItem({
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

exports.read_formweb = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
        const result = await Form42.getFormByIdweb(id);
        if (!result) return res.status(404).json({ error: 'Not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};