const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const movieController = require("../controllers/movieController");
const genreController = require("../controllers/genreController");

/* GET home page. */
router.get("/", indexController.index);

// GET request for list of all movies
router.get("/movies/", movieController.getMovies);

// GET request for list of top rated movies
router.get("/movies/toprated/:page", movieController.getTopRated);

// GET request for list of popular movies
router.get("/movies/popular/:page", movieController.getPopular);

// GET request for one movie
router.get("/movie/:id", movieController.getMovie);

// POST request for adding a movie to favorites
router.post("/movie/:id/add", movieController.addFavorite);

// GET request for list of all genres
router.get("/genres", genreController.getGenres);

// GET request for one genre
router.get("/genre/:id", genreController.getGenre);

module.exports = router;
