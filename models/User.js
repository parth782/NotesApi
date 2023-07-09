const mongoose=require('mongoose');
const { Schema } = mongoose;
const UserSchema= new Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    isAdmin:{
        type:Boolean,
        default:false
    }


},{timestamps:true});
const User=mongoose.model('user',UserSchema)
// User.createIndexes();
module.exports=User