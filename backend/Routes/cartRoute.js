const express = require('express');
var router = express.Router();
const cartCtrl = require('../Controllers/cartController')
router.post('/addToCart',cartCtrl.addToCart)
router.put('/deleteProductToCart/:userId',cartCtrl.deleteProductToCart)
router.get('/getOrdersInfo/:id',cartCtrl.getOrdersInfo)
module.exports = router