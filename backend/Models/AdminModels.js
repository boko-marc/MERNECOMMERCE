const mongoose = require('mongoose');
const AdminSchema = mongoose.Schema({

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

module.exports = mongoose.model('Admin', AdminSchema);

