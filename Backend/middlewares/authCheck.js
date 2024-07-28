const jwt=require('jsonwebtoken')

exports.authCheck=function (req,res,next){
    const token=req.header('Authorization')
    if(!token)
    {
        return res.status(403).json({message:"No Token Provided",error:"forbidden"})
    }
    try{
        const decoded=jwt.verify(token,process.env.SECRET)
        req.user=decoded
        next()
    }
    catch(err){
        console.log(err)
        return res.status(403).json({message:"Invalid Token"})

    }
}

