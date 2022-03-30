const Product = require('../Models/productModel')

// Add products
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
        published: req.body.published
    })

    product.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                err
            })
        })
}

// Retrieve all products

exports.findAllProducts = (req, res) => {
    Product.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                err
            })
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