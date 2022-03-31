const express = require('express');
var router = express.Router();
const wishCtrl = require('../Controllers/wishlistController')
router.post("/Add",wishCtrl.addWishlist)
router.put('/removeProductWishlist/:userId',wishCtrl.deleteProductToWishlist)
router.get('wishlistUser/:id',wishCtrl.getUserWishlists)

module.exports = router