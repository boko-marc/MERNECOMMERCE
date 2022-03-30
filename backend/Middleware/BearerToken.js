const jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports = async (req,res,next) => {
  if(!req.headers.authorization)
  {
    return res.send({message:"Token is required "})
  }  
  else
  {
    const token = await req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = await decodedToken.userId;
        req.auth = {userId};
        if(!req.body.userId)
        {
          return res.status(401).json({error:'UserId is required!',succes:false,status:401});
        }
        else
        {
          if (req.body.userId != userId) {

            return res.status(401).json({error:'Invalid User ID!Unauthorized request',succes:false,status:401});
          } else {
            next();
          }
        }
      }
    }