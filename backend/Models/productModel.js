const mongoose = require('mongoose');
const productSchema = mongoose.Schema({

    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required:true
    },

    Gender: {
        type:String,
        required:true
    },

    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required:true
    },

    Title: {
        type:String,
        required:true
    },

    Description: {
        type:String,
        required:true
    },

    price: {
        type:Number,
        required:true
    },

    discount: {
        type:Number,
        required:true
    },

    img: {
        Front: {type:String},
        Hover: {type:String},
        Other: []
    },

    Size: [],
    Colors: [],

    published: {
        type:Boolean
    },

    Date: {
        type:Date,
        default:Date.now()
    }
   
    
},
{
    timestamps:true,

}
);

module.exports = mongoose.model('Product', productSchema);

