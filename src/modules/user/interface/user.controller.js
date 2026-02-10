const userService = require("../service/user.service");

async function create(req, res, next) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const user = await userService.createUser({ name, email });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  get,
};
