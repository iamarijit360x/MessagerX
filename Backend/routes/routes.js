const express=require('express')
const router=express.Router()
const {signin, signup}=require('../controllers/authcontroller')
const {addtocontacts,getcontacts}=require('../controllers/usercontroller')
const {authCheck}=require('../middlewares/authCheck')


router.post('/signup',signup)
router.post('/signin',signin)
router.post('/addtocontacts',authCheck,addtocontacts)
router.get('/getcontacts',authCheck,getcontacts)
router.get('/protected',authCheck,(req,res)=>{
    res.json({message:"Protected Route"})
})
module.exports=router