import userModel from '../model/UserModel.js';

class AdminController{
    async viewAllUsers (req,res){
        const data = {
            'users':await userModel.getAllUsers()
        }
        res.render('admin/view_all',data)
    }
}
export default new AdminController();