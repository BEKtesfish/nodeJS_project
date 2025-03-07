import databaseService from '../service/DatabaseService.js'
import {hash,compareHash} from '../hashPassword/passwordHash.js';

/**
 * Model to interact with the 'users' table in the database.
 *
 * @class
 */
class UsersModel {
  /**
   * Verify and convert user ID.
   *
   * @param {string} id - The user ID as a string.
   * @returns {number} - The verified user ID as an integer.
   * @throws {Error} - Throws an error if the ID format is invalid.
   */
  verifyUserId (id) {
    const userId = parseInt(id)
    if (!Number.isInteger(userId)) {
      throw new Error('Invalid ID format')
    }
    return userId
  }

  /**
   * Get all users from the database.
   *
   * @async
   * @returns {Promise<Array>} An array of users.
   */
  async getAllUsers () {
    const query = 'SELECT * FROM user_jwt'
    return await databaseService.query(query)
  }
  async getUser (id) {
    const query = 'SELECT * FROM user_jwt where id = ?'
    const arg =[id]
    return await databaseService.query(query,arg)
  }

  async search(search){
    const query = 'SELECT * FROM user_jwt WHERE username LIKE? OR email LIKE?'
    const arg = ['%'+search+'%', '%'+search+'%']
    return await databaseService.query(query,arg)
  }

  /**
   * Add a new user to the database.
   *
   * @async
   * @param {object} user - Details for the user.
   * @returns {Promise<number>} The ID of the newly created user.
   */
  async addUser (user) {
    const { username, email, password } = user
    const hashedPassword =  await hash(password)
    const query = 'INSERT INTO user_jwt (username, email, password) VALUES (?, ?, ?)'
    const result = await databaseService.query(query, [username, email, hashedPassword])
    return result.insertId
  }

  /**
   * Update an existing user in the database.
   *
   * @async
   * @param {number} id - The ID of the user to update.
   * @param {object} user - Details of the user to update.
   * @returns {Promise<boolean>} True if the update was successful, false otherwise.
   */
  async updateUser (id, email) {
   
    const query = 'UPDATE user_jwt SET  email = ? WHERE id = ?'
    const result = await databaseService.query(query, [email, id])
    return result.affectedRows > 0
  }

  /**
   * Delete a user from the database.
   *
   * @async
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
   */
  async deleteUser (id) {
    const query = 'DELETE FROM user_jwt WHERE id = ?'
    const result = await databaseService.query(query, [id])
    return result.affectedRows > 0
  }
  async deleteAllUsers () {
    const query = 'DELETE FROM user_jwt;'
    const result = await databaseService.query(query)
    return result.affectedRows > 0
  }
}

export default new UsersModel()
