import jwt from 'jsonwebtoken';

const model ={}
export default model


model.createJwtTken =(username, role, email) =>{
    const payload ={
        iss:"Issuer id",
        sub:username,
        email,
        role,
       permissions: ['read', 'write'],
       iat: Date.now()
    }
    const options = {
        expiresIn: '1h'
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET,options)
    return token
}

model.decode = (token) =>{
    return jwt.decode(token)
}

model.verify = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET)
}