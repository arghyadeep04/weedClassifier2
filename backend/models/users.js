const mongoose=require("mongoose")
const userSchma= new mongoose.Schema({
    Email:{type:String,required:true},
    Username:{type:String,required:true,unique:true},
    Password:{type:String,required:true},
    outputs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Output'
        }
    ] 
})
// userSchma.plugin(passport)
const User=mongoose.model('User',userSchma)
module.exports=User