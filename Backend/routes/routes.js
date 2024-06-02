const express=require('express')
const router=express.Router()
const {signin}=require('../controllers/authcontroller')
const {addtocontacts,getcontacts}=require('../controllers/usercontroller')
const {authCheck}=require('../middlewares/authCheck')
router.post('/signin',signin)
router.post('/addtocontacts',authCheck,addtocontacts)
router.get('/getcontacts',authCheck,getcontacts)
module.exports=router