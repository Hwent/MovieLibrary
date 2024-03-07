const asyncHandler = require("express-async-handler");
const { MovieDb } = require("moviedb-promise");
const dotenv = require("dotenv");
dotenv.config();
const moviedb = new MovieDb(process.env.KEY);

exports.index = asyncHandler(async (req, res, next) => {
  const popularMovies = await moviedb.moviePopular();
  res.render("index", {
    title: "Movie Library Home",
    popularMovies: popularMovies.results,
  });
});
