import UsersModel from "../model/UsersModel.js";

/**
 * Controller object for handling user-related operation
 */
export const controller = {};

/**
 * Middelware to verify user ID .
 * @param {request} req - the request object.
 * @param {response} res - the response object.
 * @param {function} next - the next middleware function.
 * @param {number} id - The user ID.
 */

controller.verifyUserId = (req, res, next, id) => {
  try {
    req.userId = UsersModel.verifyUser(id);
  } catch (err) {
    return res.status(400).json(err);
  }
  next();
};

/**
 * Get all users
 * @param {request} req - the request object.
 * @param {response} res - the response object.
 */
controller.getUsers = (req, res) => {
  console.log(`user `);
  res.json(UsersModel.getAllUsers());
};

/**
 * Get one  user by ID
 * @param {request} req - the request object.
 * @param {response} res - the response object.
 * @param {req.userId} id - the user ID we will be returning
 */
controller.getUserById = (req, res) => {
  const user = UsersModel.getUserById(req.userId);
  console.log(`user:${user}, id: ${req.userId} `);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
/**
 * create user
 * @param {request} req - the request object.
 * @param {response} res - the response object.
 */
controller.createUser = (req, res) => {
  const user = UsersModel.createUser(req.body);
  res.status(201).json(user);
};

/**
 * update user by ID
 * @param {request} req - the request object.
 * @param {response} res - the response object.
 */

controller.updateUser = (req, res) => {
  let user = UsersModel.updateUser(req.userId, req.body);
  if (user) {
    res.status(201).json({ user });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

/**
 *  partialy update
 * @param {request} req - the request object.
 * @param {response} res - the response object.
 */

controller.partialUpdateUser = (req, res) => {
  const user = UsersModel.partialUpdateUser(req.userId, req.body);

  if (user) {
    res.status(201).json({ user });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

/**
 * Delete user by id
 * @param {request} req - the request object
 * @param {response} re . the response object
 */

controller.deleteUser = (req, res) => {
  const isdeleted = UsersModel.deleteUser(req.userId);
  if (isdeleted) {
    res.json({ result: "user deleted" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

/**
 * Delete all users
 * @param {request} req - the request object
 * @param {response} re . the response object
 */

controller.deleteUsers = (req, res) => {
  UsersModel.deleteUsers();
  res.json({ result: "All users deleted" });
};
