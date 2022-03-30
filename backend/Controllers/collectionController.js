const Collection = require('../Models/collectionModel')

// Add collection
exports.addCollection = (req, res) => {
    const collection = new Collection({
        name: req.body.name,
    })
    collection.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                err
            })
        })
}

// Retrieve all collection
exports.findAllCollections = (req, res) => {
    Collection.find({}).then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send({
            error: err || 'Some error occurred while retrieving collections.'
        })
    });
}


// Get collection by Id
exports.findOneCollection = (req, res) => {
    Collection.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.send({
                    error: "Collection not found"
                })
            }
            res.send(data)
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.send({
                    error: "Collection not found"
                })
            }
            return res.send({
                error: "Error while retrieving"
            })
        })
}

// Update Collection by Id
exports.updateOneCollection = (req, res) => {
    Collection.findByIdAndUpdate(
        req.params.id, {
            ...req.body
        }, {
            new: true
        }
    )
    .then(data => {
        if(!data) {
            return res.send({
                error: "Collection not found"
            })
        }
        res.send(data)
    })
    .catch(err => {
        if(err.kind === "ObjectId") {
            return res.send({
                error: "Collection not found"
            })
        }
        return res.send({
            error: "Error updating collection"
        })
    })
}

// Delete collection
exports.deleteOneCollectione = (req, res) => {
    Collection.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.send({
                error: "Collection not found"
            })
        }
        res.send({
            response: "Collection deleted successfully"
        })
    })
    .catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "Collection not found"
            })
        }
        return res.send({
            error: "Could not delete Collection"
        })
    })
}