const asyncHandler = require("express-async-handler");
const movieModel = require("../models/movie");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  if (users) {
    res.render("user_list", { title: "User list", users: users });
  }

  res.status(404);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id).populate("movies");
  if (user) {
    res.render("user_detail", { title: "User details", user: user });
  }

  res.status(404);
});

//create a test user
const createUser = asyncHandler(async (req, res) => {
  const { username, email } = { username: "test", email: "" };
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = new userModel({
    username: "test",
    password: "test",
    email: "example@test.com",
  });
  await user.save();
  res.json(user);
});

module.exports = {
  getUsers,
  getUser,
  createUser,
};
