const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    carts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Cart', cartSchema);