import bcrypt from 'bcrypt';

export const  encrypt = async (password) =>{
    return  bcrypt.hashSync(password,10)
}
export const comparePassword = async (password,hashedPassword) =>{
    return  bcrypt.compareSync(password, hashedPassword)
}
