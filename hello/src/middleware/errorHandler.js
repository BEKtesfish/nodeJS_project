import http from 'http'
export const errorHandler={}
/** 
 * Default handler for 404 routes when the resource is not found.
 * 
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {function} next Express next function
*/
errorHandler.notFound = (req,res,next)=>{
  const err = new Error(http.STATUS_CODES[404] || 'Not Found')
  err.status = 404
  next(err)
}
/**
 * Global error handler.
 * 
 * @param {object} err The cought error.
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {function} next Express next function
 */

errorHandler.errorDefualt =(err,req,res,next)=>{
  console.log(err.stack)
  const  statusCode = err.status || 500
  const message = 
        process.env.NODE_ENV === 'production'
          ? 'something went wrong'
          : err.message
  res.status(statusCode).json({
    status: statusCode,
    message,
  })
}