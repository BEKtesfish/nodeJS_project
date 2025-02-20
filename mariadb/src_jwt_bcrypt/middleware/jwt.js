import jwt from '../model/jwt.js'
export  const tokenMiddleware ={

}

tokenMiddleware.jwtTokenValidation = (req,res,next)=>{
    const token = req.header('Authorization') || null
    console.log("hello" +token)
    try{
        res.locals.jwt = jwt.verify(token)
        console.log(res.locals.jwt)
    }catch(error){
        console.error(error)
        const err = new Error("JWT token  is not valid")
        err.status= 403
        throw err
    }
    next()
}
