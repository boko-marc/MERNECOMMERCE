const express = require('express');
var router = express.Router();
const orderCtrl  = require ('../Controllers/orderController')
router.post('/addOrder',orderCtrl.addOrder)
router.get('/findAllOrders',orderCtrl.findAllOrders)
router.get('/findOneOrder/:id',orderCtrl.findOneOrder)
router.put('/updateOneOrder/:id',orderCtrl.updateOneOrder)
router.delete('/deleteOrder/:id',orderCtrl.deleteOneOrder)
module.exports = router