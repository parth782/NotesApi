var jwt = require('jsonwebtoken');
require("dotenv").config()

const fetchuser=(req,res,next)=>{
    const token=req.header('authtoken');
    if(!token){
        return res.status(401).send({error:"Please Authenticate using valid token"})
    }
    try{
    const data=jwt.verify(token,process.env.JWT_SECRET);
    req.user=data.user
    next();
    }catch(error){
        res.status(401).send({error:"Please Authenticate using valid token"})
    }

}
module.exports=fetchuser