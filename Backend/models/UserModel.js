const moongose=require('mongoose');
const contactsSchema=moongose.Schema({
    username:{type:String,required:true},
    name:{type:String},
})

const message=moongose.Schema({
    content:String,
    user:String,
    timestamp:Date
})
const userSchema=moongose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    contacts:[contactsSchema],
    temporaryMessages:[message]
})

const User=moongose.model("User",userSchema)

module.exports=User

