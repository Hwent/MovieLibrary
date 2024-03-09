const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
/* GET users listing. */
router.get("/", userController.getUsers);

// GET and POSt request for creating a test user
router.get("/createuser", userController.createUser_get);
router.post("/createuser", userController.createUser_post);

// POST request for adding a movie to favorites
router.post("/addfavorite", userController.addFavorite);

// GET request for one user
router.get("/:id", userController.getUser);

// POST request for deleting a user
router.post("/:id/delete", userController.deleteUser);

// POST request for removing a movie from favorites
router.post("/:id/movies/remove", userController.removeFavorite);

module.exports = router;
