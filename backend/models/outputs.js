const mongoose=require("mongoose")
const outputSchma= new mongoose.Schema({
    inputImageURL:{type:String},
    output:{type:String},
    Date:{type:Date,default:Date.now},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})
// userSchma.plugin(passport)
const Output=mongoose.model('Output',outputSchma)
module.exports=Output