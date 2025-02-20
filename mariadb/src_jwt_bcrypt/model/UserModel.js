import databaseService from '../service/DatabaseService.js';
import {hash,compareHash} from '../hash_pass/passwordHash.js';
import jwt from './jwt.js';
class UserModel {
    #table ="usersjwt"; 
    verifyUser(id) {
        const int = parseInt(id)
        if (!Number.isInteger(int)) {
    
          throw new Error("Invalid user id");
        } else {
          return int;
        }
    }
    
    
    async searchUser(name=null, email = null){
        let query = ""
        const args =[]
            
        if (name || email) {
            query = "SELECT * FROM ?? WHERE  "
            args.push(`%${this.#table}%`);

            if (name) {
                query += "  username LIKE ?";
                args.push(`%${name}%`);
            }

            if (email) {
                if (name){
                    query+= " OR ";
                }
                query += "email LIKE ?";
                args.push(`%${email}%`);
            }
        }
            console.log("query: ",query)
            
            return await databaseService.query(query, args);
        }

    async getUsers(name=null,email=null){
       let query = `select * from ${this.#table}`
        console.log("query: ",query)
       return await databaseService.query(query);
    }
    async addUser(nameToAdd, emailToAdd, PlainPasswordToAdd,usersRole){
        const hashedPassword = await hash(PlainPasswordToAdd)
        const args=[nameToAdd, emailToAdd, PlainPasswordToAdd,hashedPassword,usersRole]
        console.log( hashedPassword)
        const query = `INSERT INTO ${this.#table} (username, email, plainPassword,  bcryptPassword,role) VALUES (?,?,?,?,?);`
        const result =  await databaseService.query(query, args);
        console.log(result);
        return result.id

    }
    async updateUser(id,name,email){
        const query = "UPDATE ?? SET username = ? , email = ? WHERE id = ?"
        const result =  await databaseService.query(query, [this.#table,name, email, id]);
        return result.affectedRows > 0;
    }
    async deleteUser(id){
        const query = "DELETE FROM users WHERE id = ?"
        const result = await databaseService.query(query, [id]);
        return result.affectedRows >0
    }
    async getUser(name){
        const query =`SELECT * FROM ${this.#table} Where username = ?`;
        return  await databaseService.query(query,[name]);

    }
    async deleteUsers(){
        const query = `DELETE FROM ${this.#table};`
        
        const result =await databaseService.query(query);
        return result.affectedRows > 0;

    }
    async login(username, plainPassword){
     
        const [user] = await this.getUser(username)
        if(!user){
            throw new Error('User does Not exist')
        }
        console.log(user)
        const success=  await compareHash(plainPassword, user.bcryptPassword)
        if(!success){
            throw new Error('Username or password mismatch')
        }

        const token = jwt.createJwtToken(user.username,user.role,user.email)
        console.log("this tokenn" +token)
        return token;

        
    }
}

export default new UserModel();