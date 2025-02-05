class UsersModel {
  #users = [];

  /**
   * Middelware to verify user ID .
   * @param {string} - the user ID.
   * @returns {number} returns - the verifiyed user ID
   * @throws {Error} - Throws an error if the user id doesnt exist.
   */
  verifyUser(id) {
    const int = parseInt(id)
    if (!Number.isInteger(int)) {

      throw new Error("Invalid user id");
    } else {
      return int;
    }
  }

  /**
 * Get all users
 * @returns {array<object>}- returns an array of all users
 
 */
  getAllUsers() {
    return this.#users;
  }

  /**
   * Creates user
   * @param {object} - The user object to be created
   * @returns {objet} - The user object created
   */
  createUser(user) {
    if (this.#users.push(user)) {
      return user;
    }
  }

  /**
 * Get user by ID
 * @param {number} - The user id 
 * @returns {object} -Returns the user 

*/
  getUserById(id) {
    const user = this.#users.find((u) => u.id === id);
    return user ? user : null;
  }

  /**
   * update the user by id
   * @param {number} - the user ID to be updated.
   * @param {object} - The  new data for the suer.
   * @returns {object} - returns  new updated user.
   *
   */
  updateUser(userId, userData) {
    let user = this.#users.find((u) => u.id === userId);
    if (user) {
      user = { ...userData };
      return user;
    } else {
      return null;
    }
  }

  /**
   * Delete user by ID
   * @param {number} -The user ID to be deleted
   * @returns {boolean} -Returns true if the user was deleted or false if not
   */
  deleteUser(id) {
    const userIndex = users.findIndex((u) => u.id === req.userId);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return true;
    } else {
      return false;
    }
  }
  /**
 * Delete all users

 */
  deleteUsers() {
    this.#users = [];
  }

  /**
   * Partiay update user data by tehre id
   * @param {number}- The user ID to be updated
   * @param {object}- The new user data
   * @returns {object} - The newly updated user
   */
  partialUpdateUser(userId, userData) {
    const user = this.#users.find(u => u.id === userId);
    if (user) {
      Object.assign(user, userData);
      return user;
    }else{
        return null
    }
    
  }
}
export default new UsersModel();
