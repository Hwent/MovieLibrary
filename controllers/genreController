const asyncHandler = require("express-async-handler");
const genreModel = require("../models/movie");

const getGenres = asyncHandler(async (req, res) => {
  const genres = await genreModel.find();
  res.json(genres);
});

const getGenre = asyncHandler(async (req, res) => {
  const genre = await genreModel.findById(req.params.id);
  res.json(genre);
});

module.exports = {
  getGenres,
  getGenre,
};
