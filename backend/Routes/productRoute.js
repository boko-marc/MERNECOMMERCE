const express = require('express');
var router = express.Router();
const productController = require('../Controllers/productController')

router.post('/add', productController.addProduct)
module.exports = router