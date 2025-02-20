import databaseService from '../service/DatabaseService.js';
class UserModel {
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
            query = "SELECT * FROM users WHERE  "

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
       let query = "select * from users"
        const args =[] 
       if (name || email) {
         query += " WHERE  "

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
       return await databaseService.query(query,args);
    }
    async addUser(nameToAdd, emailToAdd, passwordToAdd){
        const query = "INSERT INTO users (username, email, password) VALUES (?,?,?);"
        const result =  await databaseService.query(query, [nameToAdd, emailToAdd, passwordToAdd]);
        console.log(result);
        return result.insertId

    }
    async updateUser(id,name,email){
        const query = "UPDATE users SET username = ? , email = ? WHERE id = ?"
        const result =  await databaseService.query(query, [name, email, id]);
        return result.affectedRows > 0;
    }
    async deleteUser(id){
        const query = "DELETE FROM users WHERE id = ?"
        const result = await databaseService.query(query, [id]);
        return result.affectedRows >0
    }
    async getUser(id){
        const query ="SELECT * FROM users Where id = ?";
        return  await databaseService.query(query,[id]);

    }
    async deleteUsers(){
        const query = "DELETE FROM users;"
        
        const result =await databaseService.query(query);
        return result.affectedRows > 0;

    }
}

export default new UserModel();