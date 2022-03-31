const cart = require('../Models/cartModel');

// add a product to cart juste once 
exports.addToCart = (req, res) => {
    
cart.findOne({user: req.body.user}).then((response) => {
        if(!response) {
            const add = new  cart({
                user:req.body.user,
                cart:req.body.cart
            })
            add.save().then(() => {
                res.json({response:"Product Added  to cart succefuly", succes:true})
            }).catch(err=> {res.json({err})})
        }
        // A product is already added once to the cart
        else { 
            const array = response.cart
            if(array.includes(req.body.cart))
            {
                return res.json({response:'this product is already added to the your cart', succes:false})
            }
            cart.findOneAndUpdate({user:req.body.user},{$push:{cart:req.body.cart}},{new:true}).then(() => {
                res.json({response:"Product Added to cart succefuly", succes:true})
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
            error: "Could not add product to cart",
            succes:false
        })
})
}
// remove product to cart
exports.deleteProductToCart = (req,res) => {
    cart.findOneAndUpdate({user:req.params.userId},{$pull:{cart:req.body.cart}}, {new:true}).then(add => {
        if(!add) {
            return res.json({response:'User not found'})
        }
        return res.json({response: 'Product remove to your cart', succes:true})
    }).catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "Product not found"
            })
        }
        return res.send({
            error: "Could not delete product to cart"
        })
    })
}

// get orders informations by your cart

exports.getOrdersInfo = (req,res) => {
    cart.find({user:req.params.id}).sort({createdAt: -1}).populate({
        path:'cart',
        populate:{path:'brand'},
        populate:{path:'Category'}
    })
    .exec((err,content) => {
        if(!content) 
        {
           return res.status(400).send({message: 'cart not found'})
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
            error: "Could not get this cart"
        })
    })
}