const moongose=require('mongoose');
const userSchema=moongose.Schema({
    username:String,
    password:String
})

const User=moongose.model("User",userSchema)

module.exports=User

