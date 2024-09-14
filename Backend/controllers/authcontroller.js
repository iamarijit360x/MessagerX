const express = require('express');
const User=require('../models/UserModel')
const jwt=require('jsonwebtoken')

exports.signin= async (req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username:username})
    if(!user)
        return res.status(401).json({message:"Invalid Username"})
    
    if(password!==user.password)
    {
        return res.status(401).json({message:"Invalid Username"})

    }
    const token=jwt.sign({_id:user.id,username:user.username},process.env.SECRET)
    res.status(200).json({token,success:true})
}
exports.signup= async (req,res)=>{
    
    const {username,password}=req.body;
    const user=await User.findOne({username:username})
    if(user)
        return res.status(403).json({message:"User Already Exists Procced to Login"})
    
    const newUser=new User({username:username,password:password})
    await newUser.save()
    return res.status(200).json({message:"Account Created Successfully"})
   
}

