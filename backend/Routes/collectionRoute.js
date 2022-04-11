const express = require('express');
var router = express.Router();
const collectionCtrl = require('../Controllers/collectionController')
router.post('/addCollections', collectionCtrl.addCollection)
router.get('/findAllCollections',collectionCtrl.findAllCollections)
router.get('/findOneCollection/:id',collectionCtrl.findOneCollection)
router.put('/updateOneCollection/:id',collectionCtrl.updateOneCollection)
router.delete('/deleteOneCollection/:id',collectionCtrl.deleteOneCollection)
module.exports = router