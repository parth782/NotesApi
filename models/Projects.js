const mongoose=require("mongoose");
const {Schema}=mongoose;
const ProjectSchema=new Schema({

    project_name:{
        type:String,
        min:4,
        max:30
    },
    manager_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    users:{
        type:Array,
        default:[]
    },
    Deadline:{
        type:Date,
        required:true
    }



},{timestamps:true});
const Project=mongoose.model("Project",ProjectSchema);
module.exports=Project;