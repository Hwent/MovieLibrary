const asyncHandler = require("express-async-handler");
const movieModel = require("../models/movie");
const genreModel = require("../models/genre");

const getMovies = asyncHandler(async (req, res) => {
  const movies = await movieModel.find({});
  if (movies) {
    res.render("movie_list", { title: "Movie list", movies: movies });
  }
});

const getMovie = asyncHandler(async (req, res) => {
  const movie = await movieModel.findById(req.params.id).populate("genre_ids");
  if (movie) {
    res.render("movie_detail", { title: "Movie detail", movie: movie });
  }
});

const getTopRated = asyncHandler(async (req, res) => {
  const movies = await movieModel.find({}).sort({ vote_average: -1 });
  if (movies) {
    res.render("movie_list", { title: "Top rated movies", movies: movies });
  }
});

module.exports = {
  getMovies,
  getMovie,
  getTopRated,
};
