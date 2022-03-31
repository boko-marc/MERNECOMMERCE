const wishlist = require('../Models/whishlistModel');

// add a product to wishlist juste once 
exports.addWishlist = (req, res) => {
    
    wishlist.findOne({user: req.body.user}).then((response) => {
        if(!response) {
            const wish = new  wishlist({
                user:req.body.user,
                product:req.body.product
            })
            wish.save().then(() => {
                res.json({response:"Product Added succefuly", succes:true})
            }).catch(err=> {res.json({err})})
        }
        // A product is already added once to the wishlist
        else { 
            const array = response.product
            if(array.includes(req.body.product))
            {
                return res.json({response:'this product is already added to the your wishlist', succes:false})
            }
            wishlist.findOneAndUpdate({user:req.body.user},{$push:{product:req.body.product}},{new:true}).then(() => {
                res.json({response:"Product Added succefuly", succes:true})
            })
        }
    }).catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "user not found",
                succes:false
            })
        }
        return res.send({
            error: "Could not add product to wishlist",
            succes:false
        })
})
}
// remove product to wishlist
exports.deleteProductToWishlist = (req,res) => {
    wishlist.findOneAndUpdate({user:req.params.userId},{$pull:{product:req.body.product}}, {new:true}).then(wish => {
        if(!wish) {
            return res.json({response:'User not found'})
        }
        return res.json({response: 'Product remove to your wishlist', succes:true})
    }).catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "Product not found"
            })
        }
        return res.send({
            error: "Could not delete product"
        })
    })
}

// get user table wishlists

exports.getUserWishlists = (req,res) => {
    wishlist.find({user:req.params.id}).sort({createdAt: -1}).populate({
        path:'product',
        populate:{path:'brand'},
        populate:{path:'Category'}
    })
    .exec((err,content) => {
        if(!content) 
        {
           return res.status(400).send({message: 'wishlist not found'})
        }
        if(err) {
            return res.send({error : err.message})
        }
        res.send(content);
    }).catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "Product not found"
            })
        }
        return res.send({
            error: "Could not delete product"
        })
    })
}