const { json } = require('express');
const User=require('../models/UserModel')
const jwt=require('jsonwebtoken')
exports.signin= async function(req,res){
    const {username,password}=req.body;
    const user=await User.findOne({username:username})
    if(!user)
        res.status(401).json({message:"Invalid Username"})
    
    if(password===user.password)
    {
        const token=jwt.sign({_id:user.id,username:user.username},process.env.SECRET)
        res.status(200).json({token})
    }
}
exports.signup=async