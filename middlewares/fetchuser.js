var jwt = require('jsonwebtoken');
const JWT_SECRET='Parth is good boy'

const fetchuser=(req,res,next)=>{
    const token=req.header('authtoken');
    if(!token){
        return res.status(401).send({error:"Please Authenticate using valid token"})
    }
    try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user
    next();
    }catch(error){
        res.status(401).send({error:"Please Authenticate using valid token"})
    }

}
module.exports={fetchuser}