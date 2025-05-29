const express = require('express');
const multer = require('multer');
const router = express.Router(); // Use router instead of app
const upload = multer();

const { read, list, create, update, remove, updatePhoto } = require('../Controllers/product');

router.post('/product', upload.single('product_photo'), create);

router.get('/product', list);
router.get('/product/:product_id', read);
router.put('/product/:product_id', upload.single('product_photo'), update);
router.delete('/product/:product_id', remove);

// router.put('/product/photo/:product_id', updatePhoto);



module.exports = router; // Export the router