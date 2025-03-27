const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    //first check authorization
    const authoriztion=req.headers.authorization;
    if(!authoriztion) return res.status(401).json({error:'Token not found'})


    //extract the token from the request header
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'unauthorized'});

    try{
        //verify token
        const decoded=jwt.verify(token, process.env.JWT_SECRET);

        req.user=decoded;
        next();

    }catch(err){
        console.error(err);
        res.status(401).json({error:'invalid token'});
        
    }
}


//to generate JWT token
const generateToken=(userData)=>{
    return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn: 3000});
}
module.exports={jwtAuthMiddleware,generateToken};
