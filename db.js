const moongose=require('mongoose');
require("dotenv").config()


const connecttomongo=async ()=>{
     moongose.connect(process.env.mongouri,(err)=>{
        if(err){
            console.log(err);
        }
         console.log("connected to mongo successfully");
     })
}
module.exports=connecttomongo