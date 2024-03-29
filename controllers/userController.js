const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const movieModel = require("../models/movie");
const userModel = require("../models/user");

const { body, validationResult } = require("express-validator");
const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  if (users) {
    res.render("user_list", { title: "User list", users: users });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id).populate("movies");
  if (user) {
    res.render("user_detail", { title: "User details", user: user });
  }
});

//create a new user
const createUser_get = asyncHandler(async (req, res) => {
  res.render("user_form", { title: "New user" });
});

const createUser_post = [
  // Validate and sanitize fields
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .escape(),
  body("email", "Email must not be empty").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res) => {
    // Process request after validation and sanitization
    const errors = validationResult(req);

    const user = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("user_form", {
        title: "New user",
        user: user,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save user.
      await user.save();
      res.redirect(user.url);
    }
  }),
];

//remove a movie from favorites
const removeFavorite = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const movieId = req.body.movieId;

  // Fetch the user from the database
  const user = await userModel.findById(userId);

  await user.movies.pull(movieId);
  await user.save();
  res.redirect(user.url);
});

//Delete User POST
const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (passwordMatch) {
    await userModel.deleteOne(user);
    res.redirect("/users");
  } else {
    res.status(401).send("Incorrect password");
  }
});

module.exports = {
  getUsers,
  getUser,
  createUser_get,
  createUser_post,
  removeFavorite,
  deleteUser,
};
