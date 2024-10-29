import jwt from "jsonwebtoken"

//format of jwt token is header.payload.signature
const jwtAuthMiddleware=(req,res,next)=>{

    if(!req.headers.authorization){
        return res.status(500).json({error:"token not found.Please LOGIN !"})
        
    }

    //extract jwt token from req header, i.e "Bearer abc.abc.abc"
    const token=req.headers.authorization.split(' ')[1];   
    if(!token)  return res.status(401).json({error:"Unauthorized"})
    
    try {
        //Verify the JWT token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //attach user information to the req, so that browser can store it in cookies for further use
        req.user=decoded;
        next();
        
    } catch (e) {
        
        return res.status(401).json({error:"Invalid Token"})
    }
}

const generateToken= (userData)=>{
    //userData should be object
    //Generate a new JWT token using user data
    //JWT_SECRET  - this is secret key which we can use,here we are using 12345
    return  jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:'3m'})    //expiration time => 30 -30 seconds,1m-1 minute, 1h
}

export {generateToken,jwtAuthMiddleware}
