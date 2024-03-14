const asyncHandler = require("express-async-handler");
const movieModel = require("../models/movie");
const genreModel = require("../models/genre");
const userModel = require("../models/user");
// const { MovieDb } = require("moviedb-promise");
// const dotenv = require("dotenv");
// dotenv.config();
// const moviedb = new MovieDb(process.env.KEY);

exports.index = asyncHandler(async (req, res, next) => {
  //const popularMovies = await moviedb.moviePopular();
  const popularMovies = await movieModel
    .find()
    .sort({ popularity: -1 })
    .limit(10)
    .exec();
  const moviesNum = await movieModel.countDocuments();
  const genresNum = await genreModel.countDocuments();
  const usersNum = await userModel.countDocuments();
  res.render("index", {
    title: "Movie Library Home",
    popularMovies: popularMovies,
    moviesNum: moviesNum,
    genresNum: genresNum,
    usersNum: usersNum,
  });
});
