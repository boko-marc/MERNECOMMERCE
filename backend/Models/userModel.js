const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-beautiful-unique-validation')

const userSchema = mongoose.Schema({
    firstName : {
        type:String,
        required:true, 
        unique:'Two users cannot share the same firstname'
    },

    lastName : {type:String,
        required:true, 
        unique:'Two users cannot share the same lastname'
    },

    email : {type:String,
        required:true,
        unique:"Two users cannot share the same email"
    },

    password:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },
   
    
},
{
    timestamps:true,

}
);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);