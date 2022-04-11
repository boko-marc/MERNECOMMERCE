const express = require('express');
var router = express.Router();

const brandCtrl = require('../Controllers/brandController')
router.post('/addBrand', brandCtrl.addBrand)
router.get('/findAllBrands',brandCtrl.findAllBrands)
router.get('/findOneBrand/:id',brandCtrl.findOneBrand)
router.put('/updateOneBrand/:id',brandCtrl.updateOneBrand)
router.delete('/deleteOneBrande/:id',brandCtrl.deleteOneBrande)

module.exports = router;