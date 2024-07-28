const express = require('express');
const User=require('../models/UserModel')
const jwt=require('jsonwebtoken')


exports.addtocontacts= async (req,res)=>{
    const {username,name}=req.body;
    console.log(username,name)
    const user=await User.findOne({username:username})
    if(!user)
        return res.status(204).json({sucess:false,message:"User not found"})
    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
        return res.status(404).json({ success: false, message: 'Current user not found' });
    }
    
    const contact = { username: username, name: name };
    const contactAlreadyExists=currentUser.contacts.find((item)=>item.username==contact.username)
    if(contactAlreadyExists)
        return res.status(202).json({message: 'Contact Already Exists'});


    currentUser.contacts.push(contact);
    await currentUser.save();

    return res.status(200).json({ success: true, message: 'Contact added successfully', contacts: currentUser.contacts });
} 

exports.getcontacts=async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(!user)
        return res.status(404).json({ success: false, message: 'Current user not found' });
    return res.status(200).json(user.contacts)


}