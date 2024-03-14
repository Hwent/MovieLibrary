const asyncHandler = require("express-async-handler");
const genreModel = require("../models/genre");
const movieModel = require("../models/movie");
const getGenres = asyncHandler(async (req, res) => {
  const genres = await genreModel.find({});
  if (genres) {
    res.render("genre_list", { title: "Genre list", genres: genres });
  }
});

const getGenre = asyncHandler(async (req, res) => {
  const genre = await genreModel.findById(req.params.id);
  const movies = await movieModel.find({ genre_ids: req.params.id });
  if (genre) {
    res.render("genre_detail", {
      title: "Genre detail",
      genre: genre,
      movies: movies,
    });
  }
});

module.exports = {
  getGenres,
  getGenre,
};
