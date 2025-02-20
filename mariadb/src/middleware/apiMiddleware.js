
export default (req,res ,next) => {
   
    const aKey = req.query.API_KEY
            ||  req.header("Authorization")
            ||  req.query.Authorization
            ||  null;
     if (!aKey){
            return res.status(401).json({error: "API_KEY is required"});
        }
     next();

}