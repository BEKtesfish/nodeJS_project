import databaseService from '../service/DatabaseService.js';
class UserModel {

    async getUsers(){
       const query = "select * from users"
       return await databaseService.query(query);
    }
    async addUser(nameToAdd, emailToAdd, passwordToAdd){
        const query = "INSERT INTO users (username, email, password) VALUES (?,?,?);"
        const [result] =  await databaseService.query(query, [nameToAdd, emailToAdd, passwordToAdd]);
        return result.insertid

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
}

export default new UserModel();