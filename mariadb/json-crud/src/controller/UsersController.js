import usersModel from '../model/UsersModel.js'

/**
 * Controller to perform CRUD fo rhte users collection.
 *
 * @class
 */
class UsersController {
  /**
   * Middleware to verify the user ID.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   * @param {string} id - The user ID as a string.
   */
  verifyUserId (req, res, next, id) {
    try {
      req.userId = usersModel.verifyUserId(id)
      next()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  /**
   * Show all users by fetching data from the model and return the json response.
   *
   * @param req
   * @param res
   * @param next
   * @async
   */
  async getAllUsers (req, res, next) {
    try {
      const users = await usersModel.getAllUsers()
      res.render('admin/view_all', {users})
    } catch (error) {
      next(error)
    }
  }


  async getUser (req, res, next) {
    try {
      const user = await usersModel.getUser(req.userId)
      console.log(user)
      res.render('users/view', {user:user[0]})
    } catch (error) {
      next(error)
    }
  }



  /**
   * Add a new user to the database.
   *
   * @async
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param req
   * @param res
   * @param next
   * @param {string} password - The password for the user.
   */
  async createUserPost (req, res, next) {
    try {
      const data= req.body
      if(data["first-password"] !== data["second-password"]){
        req.session.flashMessage = `User first-password and second-password are not the same`
        req.session.username = data.name || null;
        req.session.useremail = data.email || null;

        res.redirect('./create')
      }else{
        const user = {
        username: data.name,
        email: data.email,
        password: data["first-password"]
      }
      
      console.log(user)
      const id = await usersModel.addUser(user)
      req.session.flashMessage = `User with id: ${id} created.`
      res.redirect(`./${id}`)
      res.status(201).json(id)}
      
    } catch (error) {
      next(error)
    }
  }

  async createUser(req,res,next) {
    const user = {
      name:req.session.username ?? null,
      email:req.session.useremail ?? null
    }
    res.render('users/create',{user})

  }
  async frontPage(req, res) {
    res.render('users/frontPage')
  }
  /**
   * Update an existing user in the database.
   *
   * @async
   * @param {number} id - The ID of the user to update.
   * @param {string} name - The new name of the user.
   * @param req
   * @param res
   * @param next
   * @param {string} email - The new email of the user.
   */

  async logout(req, res, next){
    delete req.session?.Authenticated
    req.session.flashMessage ="seccusfully logged out"
    res.redirect('../')
  }

  async updateUserPost(req, res, next) {
 
    const email = req.body.email
    console.log("this is the email: ",email)
    const success = await usersModel.updateUser(req.userId, email)
    console.log("this is succes",success)
    if (success) {
      req.session.flashMessage = `User with id: ${req.userId} updated.`
      res.redirect(`.`)
    } else {
      throw new Error('User not found')
    }

}
  async  updateUser(req, res, next) {
   
      const data=  await usersModel.getUser(req.userId)
      const user = data[0]
    
    console.log("this is the data: ",user)
    res.render('users/update', { user})
  }

  /**
   * Delete a user from the database.
   *
   * @async
   * @param req
   * @param res
   * @param next
   * @param {number} id - The ID of the user to delete.
   */
  async deleteUserPost (req, res, next) {
   
      const success = await usersModel.deleteUser(req.userId)
      if (success) {
      req.session.flashMessage= `User ${req.userId} deleted`
      res.redirect('..')
      } else {
        throw new Error('User not found')
      }
    
  }
  async deleteUser(req,res,next) {
    const data=  await usersModel.getUser(req.userId)
    const user = data[0]
      res.render('users/delete',{user})
  }
  async deleteAllUsersPost (req, res, next) {

      const success = await usersModel.deleteAllUsers()
      if (success) {
        req.session.flashMessage = 'All users deleted'
        res.redirect('/')
      } else {
        throw new Error('No users found')
      }
    
  }
  async deleteAllUsers() {
    res.render('crud/users/delete_all')
  }

  async searchUser(req, res, next) {
    const search = req.query?.search
    let users;
    if(search){
     users = await usersModel.search(search)
    }
    const data={
      users,
      search
    }
    res.render('users/search', data)
  }

  async login(req, res,next) {
    res.locals
    res.render('users/login')
  }
  async loginPost(req, res,next) {
    const { name, password } = req.body
    try{
      const user = await usersModel.login(name,password)
      req.session.flashMessage = 'loged in successfully'
      req.session.Authenticated = user;
      res.redirect(`./${user.id}`)
    }catch(e){
      if(e.message === "User not found"){
        req.session.flashMessage = 'User not found create account to login'
        res.redirect('./create')
      }else{
        req.session.flashMessage = 'Invalid credentials'
        res.redirect('./login')
      }
      
    
    }
  

  }
  async changePassword(req, res,next){
    res.render('users/changepassword')

  }
  async changePasswordPost(req, res,next){
    const {newPassword, confirmPassword } = req.body
    const id = req.userId
    console.log(id)
    console.log(newPassword,confirmPassword)
    if(newPassword !== confirmPassword){
        req.session.flashMessage = `User first-password and second-password are not the same`
        res.redirect('./changepassword')
    }else{
      const success = await usersModel.changePass(newPassword,req.userId)
      if(!success){
        throw new Error('User not found')
      }
      req.session.flashMessage = `changed password of user with id ${id} succesfully`
      res.redirect(`.`)
      res.status(201).json(id)}

  }
}

export default new UsersController()
