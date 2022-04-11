const express = require('express');
var router = express.Router();
const categoryCtrl = require('../Controllers/categoryController')
router.post('/addCategory',categoryCtrl.addCategory)
router.delete('/deleteCategory/:id',categoryCtrl.deleteCategory)
router.get('/getAllCategory',categoryCtrl.getAllCategory)
router.get('/getCategoryById/:id',categoryCtrl.getCategoryById)
router.put('/updatecategory/:id',categoryCtrl.updatecategory)
module.exports = router