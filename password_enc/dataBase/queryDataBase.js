import {pool} from './connectDataBase.js';
import {encrypt,comparePassword} from '../encryption/enc.js';
const user= {
    name: "user1",
    age: 30,
    password: "password123",
    email: "user1@example.com"

}
async function createUser(user){
    try{
       const {name,age,password,email} =user 
        const hashedPassword = await encrypt(password);
        await pool.query("INSERT INTO user (name,age,password,email) VALUES (?,?,?,?)",[
            name,
            age,
            hashedPassword,
            email
        ])
        return true;
    }catch(e){
        console.error('Error encrypting password:', e);
        return false;
    }
}
async function getUser(id){
    const user = await pool.query("SELECT * FROM user WHERE id =?",[
        id
    ])
    return user[0];
}
async function  login(name,password){
    let isLegit=false;
    const [expectedUser] = await pool.query("SELECT * FROM user WHERE name =?",
        [name]
    )
    console.log(expectedUser)
   
    if(expectedUser.length > 0){
      isLegit = await comparePassword(password, expectedUser[0].password)
    }

   if(isLegit){
    return await getUser(expectedUser[0].id);
   }else{
     throw new Error("Wrong password or username");
   
   }
}
async function getUsers(){
    const users = await pool.query("SELECT * FROM user");
    return users;
}

console.log(await login("berek",user.password))

