const middleware = {}
export {middleware as auth}

middleware.isAuthenticatedOrRedirectedLogin = (req,res,next) => {
    const username = req.session?.authenticated?.username
    if(!username){
        res.redirect('/login')
    }
    next();
}

middleware.hasRoleAdminOrForbidden = (req,res,next) => {
    const role = req.session?.authenticated?.role
    if(role!=='admin'){
        const error = new Error('You need to have role=admin to access this resource!')
        error.status = 403
        throw error
    }
    next();
}