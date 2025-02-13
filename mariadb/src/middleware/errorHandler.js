import http from 'http';
export const errorHandler = {}


errorHandler.notFound = async (req,res, next)=>{
    const err = new Error(http.STATUS_CODES[404] || 'Not Found');
    err.status = 404;
    next(err);
}




errorHandler.errorDefualt = (err,req,res,next)=>{
    console.log(err);
    const statusCode = err.status || 500;
    const message = 
    process.env.NODE_ENV ==='production' ?
                    'Something went wrong':
                    err.message;
    res.status(statusCode).json({
        status: statusCode,
        message,
    })


}