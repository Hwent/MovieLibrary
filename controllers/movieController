const asyncHandler = require("express-async-handler");
const movieModel = require("../models/movie");

const getMovies = asyncHandler(async (req, res) => {
  const movies = await movieModel.find({});
  res.json(movies);
});

const getMovie = asyncHandler(async (req, res) => {
  const movie = await movieModel.findById(req.params.id);
  res.json(movie);
});

module.exports = {
  getMovies,
  getMovie,
};
