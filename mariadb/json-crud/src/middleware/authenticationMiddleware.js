const middleware = {}
export {middleware as auth}

middleware.isAuthenticatedOrRedirectedLogin = (req,res,next) => {
    const username = req.session?.Authenticated?.username
    
    if(!username){
        req.session.flashMessage = "you need to authenticate yourself first by loging in or creating an account"
        return res.redirect('/crud')
    }
    next();
}
middleware.skippLoging = (req,res,next) => {
    const id = req.session?.Authenticated?.id
    
    if(!id){
        return next()
    }
    return res.redirect(`./users/${id}`)
}

middleware.hasRoleAdminOrForbidden = (req,res,next) => {
    console.log( req.session)
    const role = req.session?.Authenticated?.role
    if(role!=='admin'){
        const error = new Error('You need to have role=admin to access this resource!')
        error.status = 403
        throw error
    }
    next();
}