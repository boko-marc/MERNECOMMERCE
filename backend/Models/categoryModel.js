const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name:{type:String, required:true},
    collections:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
    }],
},{
    timestamps:true
})
module.exports = mongoose.model('Category', categorySchema);