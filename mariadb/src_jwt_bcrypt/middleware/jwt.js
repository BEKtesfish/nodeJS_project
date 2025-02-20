import jwt from '../model/jwt.js'
export  const tokenMiddleware ={

}

tokenMiddleware.jwtTokenValidation = (req,res,next)=>{
   console.log("this is authorization token ", req.cookies.authToken)
    //const token =  req.headers['authorization']?.split(" ")[1];
    const token = req.cookies.authToken; // getting token from cookies
    console.log("this is the token ", token); 
    if(!token){
       res.status(401).json({message:"Invalid token"});
    }

    try{
        res.user = jwt.verify(token)
        next()
       
    }catch(error){
        res.status(401).json({message:"Invalid token"});
    }
    
}
