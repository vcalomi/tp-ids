const userRepository = require("../repository/userRepository.js");

async function findUser(username) {
  return await userRepository.findUser(username);
}

async function findUserById(userId) {
  return await userRepository.findUserById(userId);
}

async function createUser(username, password) {
  return await userRepository.createUser(username, password);
}

async function getUsers() {
  return await userRepository.getUsers();
}

module.exports = {
  findUser,
  findUserById,
  createUser,
  getUsers,
};
