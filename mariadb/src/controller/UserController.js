import OutputHandler from '../view/OutputHandler.js';

import userModel from '../model/UserModel.js';

class UserController{

    async showUsers(){
        try {
            const user = await userModel.getUsers();
          
            OutputHandler.showUsers(user);
        } catch (error) {
            OutputHandler.showError("Couldn't not fetch users");
        }
    }
    async addUser(nameToAdd, emailToAdd, passwordToAdd){
        try{
            const id = await userModel.addUser(nameToAdd, emailToAdd, passwordToAdd);
            OutputHandler.showSuccess(`New user added with ID: ${id}`);
        }catch(e){
            OutputHandler.showError("Couldn't add user",e);
        }

    }
    async updateUser(id,name,email){
        try{
            const success = await userModel.updateUser(id,name,email);
            if(success){
                OutputHandler.showSuccess(`User with ID: ${id} updated successfully`);
            }else{
                OutputHandler.showError(`User with ID: ${id} not found`);
            }
            
        }catch(e){
            OutputHandler.showError("Couldn't update user",e);
        }
    }
    async deleteUser(id){
        try{
            const success = await userModel.deleteUser(id);
            if(success){
                OutputHandler.showSuccess(`User with ID: ${id} deleted successfully`);
            }else{
                OutputHandler.showError(`User with ID: ${id} not found`);
            }
        }catch(e){
            OutputHandler.showError("Couldn't delete user",e);
        }
    }

  



}
export default new UserController();