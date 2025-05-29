const Product = require('../Models/product');

exports.read = async (req, res) => {
    const product_id = req.params.product_id;
    Product.findById(product_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.length) return res.status(404).json({ message: 'Product not found' });
        res.json(results[0]);
    });
}

exports.list = async (req, res) => {
    Product.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });

}

exports.create = async (req, res) => {
    const data = req.body;
    const file = req.file;

    Product.create(data, file, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product created', product_id: result.insertId });
    });
};

exports.update = async (req, res) => {
    const id = req.params.product_id;
    const data = req.body;
    const file = req.file;
    Product.updateById(id, data, file, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated' });
    });

}

exports.remove = async (req, res) => {
    const id = req.params.product_id;
    Product.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    });
};