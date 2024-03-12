const asyncHandler = require("express-async-handler");
const movieModel = require("../models/movie");
const genreModel = require("../models/genre");
const userModel = require("../models/user");
const { tr } = require("faker/lib/locales");
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

//add a movie to favorites
const addFavorite = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.userId; // Get the user's ID from the request body
    const movieId = req.body.movieId; // Get the movie's ID from the request body
    //console.log(userId, movieId);
    // Fetch the user from the database
    const user = await userModel.findById(userId);

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    if (user.movies.includes(movieId)) {
      res.status(400).send({ message: "Movie already in favorites" });
      return;
    }
    // Add the movie to the user's favorites
    user.movies.push(movieId);

    // Save the user
    await user.save();
    res.json({ success: true });
    // Redirect to the user's page
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
module.exports = {
  getMovies,
  getMovie,
  getTopRated,
  getPopular,
  addFavorite,
};
