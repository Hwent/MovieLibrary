const asyncHandler = require("express-async-handler");
const movieModel = require("../models/movie");
const genreModel = require("../models/genre");
const page_limit = 20;

const getMovie = asyncHandler(async (req, res) => {
  const movie = await movieModel.findById(req.params.id).populate("genre_ids");
  if (movie) {
    res.render("movie_detail", { title: "Movie detail", movie: movie });
  }
});

const getMovies = asyncHandler(async (req, res) => {
  const movies = await movieModel.find({});
  if (movies) {
    res.render("movie_list", { title: "Movie list", movies: movies });
  }
});

const getTopRated = asyncHandler(async (req, res) => {
  const page = parseInt(req.params.page, 10);
  const skip = (page - 1) * page_limit;
  const movies = await movieModel
    .find()
    .sort({ vote_average: -1 })
    .skip(skip)
    .limit(page_limit);
  if (movies) {
    res.render("movie_list", {
      title: "Top rated movies",
      movies: movies,
      category: "toprated",
      page: page,
    });
  }
});

const getPopular = asyncHandler(async (req, res) => {
  const page = parseInt(req.params.page, 10);
  const skip = (page - 1) * page_limit;
  const movies = await movieModel
    .find({})
    .sort({ popularity: -1 })
    .skip(skip)
    .limit(page_limit);
  if (movies) {
    res.render("movie_list", {
      title: "Popular movies",
      movies: movies,
      category: "popular",
      page: page,
    });
  }
});

module.exports = {
  getMovies,
  getMovie,
  getTopRated,
  getPopular,
};
