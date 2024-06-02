const moongose=require('mongoose');
const contactsSchema=moongose.Schema({
    username:{type:String,required:true},
    name:{type:String,required:true},
})
const userSchema=moongose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    contacts:[contactsSchema]
})

const User=moongose.model("User",userSchema)

module.exports=User

