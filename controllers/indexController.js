const asyncHandler = require("express-async-handler");
const movieModel = require("../models/movie");
// const { MovieDb } = require("moviedb-promise");
// const dotenv = require("dotenv");
// dotenv.config();
// const moviedb = new MovieDb(process.env.KEY);

exports.index = asyncHandler(async (req, res, next) => {
  //const popularMovies = await moviedb.moviePopular();
  const popularMovies = await movieModel
    .find({})
    .sort({ popularity: -1 })
    .limit(10)
    .exec();
  res.render("index", {
    title: "Movie Library Home",
    popularMovies: popularMovies,
  });
});
