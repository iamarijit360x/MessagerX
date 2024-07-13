const jwt=require('jsonwebtoken')

exports.authCheck=function (req,res,next){
    const token=req.header('Authorization')
    if(!token)
    {
        res.status(403).json({message:"No Token Provided",error:"forbidden"})
    }
    try{
        const decoded=jwt.verify(token,process.env.SECRET)
        req.user=decoded
        next()
    }
    catch(err){
        console.log(err)
        res.status(403).json({message:"Invalid Token"})

    }
}

exports.authenticateUser=function (token) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const userEmail = decoded.email;
        console.log(decoded)
        return userEmail;
    } catch (error) {
        console.error('Error authenticating user:', error.message);
        return null;
    }
}

