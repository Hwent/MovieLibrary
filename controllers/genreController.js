const asyncHandler = require("express-async-handler");
const genreModel = require("../models/genre");

const getGenres = asyncHandler(async (req, res) => {
  const genres = await genreModel.find({});
  if (genres) {
    res.render("genre_list", { title: "Genre list", genres: genres });
  }
  res.status(404);
});

const getGenre = asyncHandler(async (req, res) => {
  const genre = await genreModel.findById(req.params.id);
  if (genre) {
    res.render("genre_detail", { title: "Genre detail", genre: genre });
  }
  res.status(404);
});

module.exports = {
  getGenres,
  getGenre,
};