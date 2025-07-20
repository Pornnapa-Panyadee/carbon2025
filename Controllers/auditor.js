const Auditor = require('../Models/auditor');

exports.read = async (req, res) => {
    try {
        const auditor_id = req.params.auditor_id;
        const result = await Auditor.findById(auditor_id);
        if (!result) return res.status(404).json({ message: 'Auditor not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const results = await Auditor.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await Auditor.create(data);
        res.status(201).json({ message: 'Auditor created', auditor_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.auditor_id;
        const data = req.body;
        const result = await Auditor.updateById(id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Auditor not found' });
        res.json({ message: 'Auditor updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.auditor_id;
        const result = await Auditor.deleteById(id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Auditor not found' });
        res.json({ message: 'Auditor deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.readAuditorReport = async (req, res) => {
    try {
        const auditor_id = req.params.auditor_id;
        const result = await Auditor.readAuditorReportID(auditor_id);
        if (!result) return res.status(404).json({ message: 'Auditor not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createComment = async (req, res) => {
    try {
        const data = req.body;
        // const message_alert = "ผู้ทวนสอบได้ตอบกลับบริษัทของคุณ";
        const create_by = "auditor";

        const result = await Auditor.createComment(data, create_by);
        res.status(201).json({ message: 'Comment created', comment_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listComments = async (req, res) => {
    try {
        const comments_id = req.params.comments_id;
        const result = await Auditor.listComments(comments_id);
        if (!result) return res.status(404).json({ message: 'No comments found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        console.log("req.body = ", req.body); // << debug

        const comments_id = req.params.comments_id;
        const data = req.body;
        console.log(req.body)

        const result = await Auditor.updateComment(comments_id, data);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Comment not found' });

        res.json({ message: 'Comment updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteComment = async (req, res) => {
    try {
        const comments_id = req.params.comments_id;
        const result = await Auditor.deleteComment(comments_id);
        if (!result || result.affectedRows === 0) return res.status(404).json({ message: 'Comment not found' });
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.readAuditorProductDetails = async (req, res) => {
    try {
        const { auditor_id, product_id } = req.params;
        const result = await Auditor.readAuditorProductDetails(auditor_id, product_id);
        if (!result) return res.status(404).json({ message: 'Product details not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateStatusProduct = async (req, res) => {
    try {
        const { auditor_id, product_id, status_id } = req.params;
        const { status } = req.body;  // ค่าสถานะใหม่ที่ต้องการอัพเดต

        if (typeof status === 'undefined') {
            return res.status(400).json({ error: 'Missing status in request body' });
        }

        const { result, statusInfo } = await Auditor.updateStatusProduct(auditor_id, product_id, status_id, status);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product status not found or no change' });
        }

        res.json({ message: 'Product status updated', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};