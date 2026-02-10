const User = require("../model/user.model");

async function createUser(data) {
  return User.create(data);
}

async function getUserById(id) {
  return User.findByPk(id);
}

module.exports = {
  createUser,
  getUserById,
};
