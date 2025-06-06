const Product = require('../Models/product');

exports.read = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const product = await Product.findById(product_id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.list = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;
        const result = await Product.create(data, file);
        res.status(201).json({ message: 'Product created', product_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.product_id;
        const data = req.body;
        const file = req.file;
        const result = await Product.updateById(id, data, file);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.product_id;
        const result = await Product.deleteById(id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};