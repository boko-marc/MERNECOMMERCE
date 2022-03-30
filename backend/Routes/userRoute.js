const express = require('express');
var router = express.Router();
const userCtrl = require('../Controllers/userController')
router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.get("/profil/:id",userCtrl.profil)
router.get("/profilAdmin/:id",userCtrl.profilAdmin)
router.post('/forgotPassword',userCtrl.forgotPassword)
router.put('/updatePasswordAfterReceiveEmail/:id',userCtrl.updatePasswordAfterReceiveEmail)
router.put('/updateInfoProfil/:id',userCtrl.updateInfoProfil)
router.put('/updatePasswordProfil/:id',userCtrl.updatePasswordProfil)
router.get('/getAllUsers',userCtrl.getAllUsers)
module.exports = router