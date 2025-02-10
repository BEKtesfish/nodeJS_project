import OutputHandler from '../view/OutputHandler.js';

import userModel from '../model/UserModel.js';

class UserController{

    async showUser(){
        try {
            const user = await userModel.getUser();
            OutputHandler.showUsers(user);
        } catch (error) {
            OutputHandler.showError("Couldn't not fetch users");
        }
    }
}