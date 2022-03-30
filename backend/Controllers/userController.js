const User = require('../Models/userModel')
const jwt =require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require("bcrypt");
const nodemailer = require('../Config/nodemailerResetPassword.config')
const Admin = require('../Models/adminModel')


// register function
exports.register = (req,res,next) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(!user)
        {
            const register = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,10),
                phone:req.body.phone
            });
            register.save().then(() => { 
              return   res.status(201).json({message:'User create', succes:true,status:201})} )
            
        }
        else {
            return res.json({message:'This account exist change your informations', succes:false})
        }
    }).catch(error => res.status(500).json({error}));

}

// login function 
exports.login = (req,res,next) => {
    User.findOne({email :req.body.email})
    .then(user => {
        if(!user) 
        {   
            Admin.findOne({email: req.body.email}).then(admin =>  {
                if(!admin)
                {
                    return res.json({message :'Incorrect Email please check!', succes:false});
                }
                bcrypt.compare(req.body.password, admin.password).then(valid => {
                    if(!valid) {
                        return res.json({message : 'Incorrect password!Password forget?',succes:false})
                    }

                    return res.status(200).json({
                        boolean:0,
                        status:200,
                        succes:true,
                        userId : admin._id,
                        token : jwt.sign(
                            {userId : admin._id},
                            process.env.SECRET_TOKEN,
                            {expiresIn: process.env.TIME}
                        )
                    })
                })
            })
            
        }
        else {
            bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) 
            {
                return res.json({message : 'Incorrect password!Forgot password?',succes:false})
            }
            else
            {
                
                    return res.status(200).json({
                        user,
                        status:200,
                        succes:true,
                        userId : user._id,
                        token : jwt.sign(
                            {userId : user._id},
                            process.env.SECRET_TOKEN,
                            {expiresIn: process.env.TIME}
                        )
                    })
                
            }
         
        }).catch(error => res.status(500).json({error, status:500,succes:false}))
        }
    })
}

// user profil
exports.profil = (req,res,next) => {
    User.findById(req.params.id).then((user) => {
        if(!user) {
            return res.status(401).json({message : 'User not found', status:401,succes:false})
        }
        return res.status(200).json({user, status:200,succes:true})
    })
}
// admin profil
exports.profilAdmin = (req,res,next) => {
    Admin.findById(req.params.id).then((admin) => {
        if(!admin) {
            return res.status(401).json({message : 'User not found', status:401,succes:false})
        }
        return res.status(200).json({admin, status:200,succes:true})
    })
}
// forgot password user
exports.forgotPassword = (req,res,next) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(!user) {
            return res.json({message : 'Email Incorrect , check your email', succes:false})
        }
       
        nodemailer.sendConfirmationEmail(
            user.firstName,
            user.email,
            jwt.sign({userId : user._id},process.env.secret)
          )
    
          return res.json({message :'You have received an email to change your password!',status:201,succes:true})
    })
}
// update Password After Receive Email function  with confirm password (confirmPassword)
exports.updatePasswordAfterReceiveEmail = (req,res,next) => {
    const UserConfirm =  req.params.id
    const confirmation = jwt.verify(UserConfirm,process.env.secret);
    const confirm = confirmation.userId
    if(req.body.password !== req.body.confirmPassword)
    {
        return res.json({message :'Bad confirmation password!',succes:false})
    }
    User.findByIdAndUpdate(confirm,{
            password:bcrypt.hashSync(req.body.password,10),
    },
    {new: true})
    .then(user => {
        if(!user)
        {
            return res.status(401).json({message :'Email incorrect veuillez revoir votre email!',status:401,succes:false})
        }

        return  res.status(201).json({message :'Password update succefuly',succes : true,status : 201})

    }).catch(error => res.status(500).json({error})) 
}
// update informations profil
exports.updateInfoProfil = (req,res,next) => {
    User.findByIdAndUpdate(req.params.id,{
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone
    }, { new:true}).then(user => {
        if(!user) 
        {
            return res.status(401).json({message :'Can not reset your profil',status:401,succes:false})
        }
        return res.status(200).json({message:'Informations update succefuly', status:200, succes:true})
    }).catch(error => res.status(500).json({error})) 
}

// update password in profil page with old password(oldPassword)
exports.updatePasswordProfil = (req,res,next) => {
    User.findById(req.params.id).then((user) => {
        if(user) {
            bcrypt.compare(req.body.oldPassword,user.password).then(valid => {
                if(!valid)
                {
                    return res.json({message:'Old incorrect password', succes:false})
                }
                User.findByIdAndUpdate(req.params.id,{
                    password:bcrypt.hashSync(req.body.password,10),
            },
            {new: true})
            .then(user => {
                if(!user)
                {
                    return res.status(401).json({message :'Email incorrect veuillez revoir votre email!',status:401,succes:false})
                }
            
                return  res.status(201).json({message :'Password update succefuly',succes : true,status : 201})
            
            }).catch(error => res.status(500).json({error})) 
            })
        }
        else 
        {
            return res.json({message :'User not found!',succes:false})
        }
    })
  
}
// get all users
exports.getAllUsers = (req,res, next) => {
    User.find().then((user) => {
        return res.status(200).json({user,message:'All users'})
    })
}