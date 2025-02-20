import bcrypt from 'bcrypt';

export const  hash = async (password) =>{
    return  bcrypt.hashSync(password,10)
}
export const compareHash = async (password,hashedPassword) =>{
    return  bcrypt.compareSync(password, hashedPassword)
}
