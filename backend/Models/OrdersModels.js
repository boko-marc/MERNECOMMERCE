const mongoose = require('mongoose')
const odersSchema = mongoose.Schema({
    FirstName:{
        type:String, 
        required:true 
    },

        LastName:{
            type:String, required:true
        },

        State:{
            type:String,
            required:true
        },
        Town:{
            type:String,
            required:true
        },

        Adresse:{
            type:String,
            required:true
        },

        Phone:{
            type:Number,
            required:true
        },

        Email:{
            type:String,
            required:true
        },

        Cart:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
        },
        CartSummary: {
            subtotal:{type:Number},
            Delivery:{type:Number},
            Discount:{type:Number, default:0},
            Total:{type:Number}
        },
        SubmittedDate : {
            type: Date,
            default:Date.now()
        },
        Delivery:{
            Cheched:{type:Boolean, default:false},
            Confirm:{type:Boolean, default:false},
            Arrived:{type:Boolean, default:false}
        }

}, {
    timestamps: true
})
module.exports = mongoose.model('Order', odersSchema);