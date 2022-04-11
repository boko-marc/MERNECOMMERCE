const Product = require('../Models/productModel')

// Add product
exports.addProduct = (req, res) => {
    const product = new Product({
        brand: req.body.brand,
        Gender: req.body.Gender,
        Category: req.body.Category,
        Title: req.body.Title,
        Description: req.body.Description,
        price: req.body.price,
        discount: req.body.discount,
        img: {
            Front: req.body.Front,
            Hover: req.body.Hover,
            Other: req.body.Other
        },
        Size: req.body.Size,
        Colors: req.body.Colors,
        publishAtHomePage: req.body.publishAtHomePage
    })

    product.save()
        .then(data => {
           return res.send(data)
        })
        .catch(err => {
           return res.send({
                err
            })
        })
}

// Retrieve all products by created desc
exports.findAllProducts = (req, res) => {
    Product.find({}).sort({createdAt: -1})
    .exec((err, data) => {
        if(!data) {
            return res.send({
                error: "Products not found"
            });
        }

        if (err) {
            return res.send({
                error: err
            });
        }
        res.send(data)
    })
}

// Display the last product at homepage  by created desc
exports.publishAtHomePage = (req, res) => {
    Product.find({publishAtHomePage: true})
    .sort({createdAt: -1})
    .limit(5)
    .exec((err, data) => {
        if(!data) {
            return res.send({
                error: "Products not found"
            });
        }

        if (err) {
            return res.send({
                error: err
            });
        }
        res.send(data)
    })

}

// Get product by Id
exports.findOneProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.send({
                    error: "Product not found"
                })
            }
            res.send(data)
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.send({
                    error: "Product not found"
                })
            }
            return res.send({
                error: "Error while retrieving"
            })
        })
}

// Update Product by Id

exports.updateOneProduct = (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id, {
            ...req.body
        }, {
            new: true
        }
    )
    .then(data => {
        if(!data) {
            return res.send({
                error: "Product not found"
            })
        }
        res.send(data)
    })
    .catch(err => {
        if(err.kind === "ObjectId") {
            return res.send({
                error: "Product not found"
            })
        }
        return res.send({
            error: "Error updating product"
        })
    })
}

// Delete product

exports.deleteOneProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.send({
                error: "Product not found"
            })
        }
        res.send({
            response: "Product deleted successfully"
        })
    })
    .catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "Product not found"
            })
        }
        return res.send({
            error: "Could not delete Product"
        })
    })
}