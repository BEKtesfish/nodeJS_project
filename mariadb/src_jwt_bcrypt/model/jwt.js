import jwt from 'jsonwebtoken';
 const  model = {}
model.createJwtToken = (username,role,email) => {
    const payload={
        iss:"Issuer id",
        sub:username,
       username,
       email,
       role,
       permissions : ["write", "read"],
       iat:Date.now()
    }
    const options ={
        expiresIn: '1h'
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, options)
    return token
}
model.verify =(token) =>{
    return jwt.verify(token,process.env.JWT_SECRET)
}
export default model;
