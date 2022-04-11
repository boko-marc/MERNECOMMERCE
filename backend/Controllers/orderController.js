const Order = require('../Models/orderModel')
const nodemailer = require('../Config/nodemailerResetPassword.config')

// Add order
exports.addOrder = (req, res) => {
    const order = new Order({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        State: req.body.State,
        Adresse: req.body.Adresse,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Cart: req.body.Cart,
        CartSummary: {
            subtotal: req.body.subtotal,
            Delivery: req.body.Delivery,
            Discount: req.body.Discount,
            Total: req.body.Total,
        },
    })

    order.save()
        .then(data => {
           return res.send(data)
        })
        .catch(err => {
           return res.send({
                err
            })
        })
}

// Retrieve all orders by created desc
exports.findAllOrders = (req, res) => {
    Order.find({}).sort({createdAt: -1})
    .exec((err, data) => {
        if(!data) {
            return res.send({
                error: "Orders not found"
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

// Get order by Id
exports.findOneOrder = (req, res) => {
    Order.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.send({
                    error: "Order not found"
                })
            }
            res.send(data)
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.send({
                    error: "Order not found"
                })
            }
            return res.send({
                error: "Error while retrieving"
            })
        })
}

// Update Order by Id
exports.updateOneOrder = (req, res) => {
    Order.findByIdAndUpdate(
        req.params.id, {
            ...req.body
        }, {
            new: true
        }
    )
    .then(data => {
        if(!data) {
            return res.send({
                error: "Order not found"
            })
        }
        res.send(data)
    })
    .catch(err => {
        if(err.kind === "ObjectId") {
            return res.send({
                error: "Order not found"
            })
        }
        return res.send({
            error: "Error updating order"
        })
    })
}

// Add manage order 
exports.manageOrder = (req, res) => {

}

// Delete order
exports.deleteOneOrder = (req, res) => {
    Order.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.send({
                error: "Order not found"
            })
        }
        res.send({
            response: "Order deleted successfully"
        })
    })
    .catch(err => {
        if(ReferenceError.kind === "ObjectId" || err.name === "NotFound") {
            return res.send({
                error: "Order not found"
            })
        }
        return res.send({
            error: "Could not delete Order"
        })
    })
}

