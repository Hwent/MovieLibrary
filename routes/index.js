const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const movieController = require("../controllers/movieController");
const genreController = require("../controllers/genreController");
const userController = require("../controllers/userController");
/* GET home page. */
router.get("/", indexController.index);

// GET request for list of all movies
router.get("/movies", movieController.getMovies);

// GET request for one movie
router.get("/movie/:id", movieController.getMovie);

// GET request for list of all genres
router.get("/genres", genreController.getGenres);

// GET request for one genre
router.get("/genre/:id", genreController.getGenre);

// GET request for list of all users
router.get("/users", userController.getUsers);

// GET request for one user
router.get("/user/:id", userController.getUser);

// GET request for creating a test user
router.get("/createuser", userController.createUser);

module.exports = router;
