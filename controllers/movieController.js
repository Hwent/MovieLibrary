const asyncHandler = require("express-async-handler");
const movieModel = require("../models/movie");
const genreModel = require("../models/genre");

const getMovies = asyncHandler(async (req, res) => {
  const movies = await movieModel.find({});
  res.json(movies);
});

const getMovie = asyncHandler(async (req, res) => {
  const movie = await movieModel.findById(req.params.id).populate("genre_ids");
  if (movie) {
    res.render("movie_detail", { title: "Movie detail", movie: movie });
  }
  res.status(404);
});

module.exports = {
  getMovies,
  getMovie,
};
