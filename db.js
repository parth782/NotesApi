const moongose=require('mongoose');
require("dotenv").config()


const connecttomongo=async ()=>{
     moongose.connect(process.env.mongouri,()=>{
         console.log("connected to mongo successfully");
     })
}
module.exports=connecttomongo