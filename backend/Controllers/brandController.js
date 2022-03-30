const Brand = require('../Models/brandModel')

// Add brand
exports.addBrand = (req, res) => {
    const brand = new Brand({
        name: req.body.name,
    })
    brand.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                err
            })
        })
}

// Retrieve all brand
exports.findAllBrands = (req, res) => {
    Brand.find({}).then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send({
            error: err || 'Some error occurred while retrieving brands.'
        })
    });
}


// Get brand by Id
exports.findOneBrand = (req, res) => {
    Brand.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.send({
                    error: "Brand not found"
                })
            }
            res.send(data)
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.send({
                    error: "Brand not found"
                })
            }
            return res.send({
                error: "Error while retrieving"
            })
        })
}

// Update Brand by Id
exports.updateOneBrand = (req, res) => {
    Brand.findByIdAndUpdate(
        req.params.id, {
            ...req.body
        }, {
            new: true
        }
    )
    .then(data => {
        if(!data) {
            return res.send({
                error: "Brand not found"
            })
        }
        res.send(data)
    })
    .catch(err => {
        if(err.kind === "ObjectId") {
            return res.send({
                error: "Brand not found"
            })
        }
        return res.send({
            error: "Error updating brand"
        })
    })
}

// Delete brand
exports.deleteOneBrande = (req, res) => {
    Brand.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.send({
                error: "Brand not found"
            })
        }
        res.send({
            response: "Brand deleted successfully"
        })
    })
    .catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "Brand not found"
            })
        }
        return res.send({
            error: "Could not delete Brand"
        })
    })
}