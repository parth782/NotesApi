const mongoose=require('mongoose');
const { Schema } = mongoose;
const NotesSchema= new Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String,
        //unique:true
    },
    tag:{
       default:"general",
        type:String
    },
    date:{
        
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }


});
module.exports=mongoose.model('notes',NotesSchema)