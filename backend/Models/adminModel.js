const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({

    email : {type:String,
        required:true,
        unique:"Two users cannot share the same email"
    },

    password:{
        type:String,
        required:true
    },   
    
},
{
    timestamps:true,

}
);

module.exports = mongoose.model('Admin', adminSchema);

