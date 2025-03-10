import jwt from '../model/jwt.js'

const middleware = {}

export { middleware as jwtMiddleware}

middleware.jwtTokenIsValid = (req,res, next)=>{
    const token = req.header('Authorization') ||
    null
    try{
        res.locals.jwt = jwt.verify(token)
        console.log(res.locals.jwt)
    } catch (err){
        consol.error(err)
        err.status =403
        if(err.name=='TokenExpiredError'){
            err.status = 401
        }
        throw err
    }
    next()
}