const jwt=require('jsonwebtoken')

exports.authCheck=function (req,res,next){
    const token=req.header('Authorization') || ''
    if(!token)
    {
        res.status(403).json({message:"forbidden"})
    }
    try{
        const verified=jwt.verify(token,process.env.SECRET)
        const decoded=jwt.verify(token,process.env.SECRET)
        req.user=decoded
        
        next()
    }
    catch(err){
        console.log(err)
        res.status(403).json({message:"forbidden"})

    }
}

exports.authenticateUser=function (token) {
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.SECRET);
        // In a real-world scenario, you might fetch user details from a database based on the token payload
        // For this example, we'll assume the token contains the user's email
        const userEmail = decoded.email;
        console.log(decoded)
        return userEmail;
    } catch (error) {
        console.error('Error authenticating user:', error.message);
        return null;
    }
}

