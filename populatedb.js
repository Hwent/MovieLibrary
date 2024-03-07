#! /usr/bin/env node
//command node populatedb.js "mongodb+srv://cooluser:password"
console.log("load test data");
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Genre = require("./models/genre");
const Movie = require("./models/movie");
const { MovieDb } = require("moviedb-promise");
const dotenv = require("dotenv");
dotenv.config();
const moviedb = new MovieDb(process.env.KEY);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Clearing database");
  await clear();
  console.log("Debug: Creating genres");
  await creatGenres();
  console.log("Debug: Creating movies");
  await createMovies(1);
  await createMovies(2);
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function creatGenres() {
  const genres = await moviedb.genreMovieList();
  for (const genre of genres.genres) {
    const genreDetail = {
      _id: genre.id,
      name: genre.name,
    };
    const newGenre = new Genre(genreDetail);
    await newGenre.save();
  }
}

async function createMovies(page) {
  const movies = await moviedb.moviePopular({ page });
  for (const movie of movies.results) {
    const movieDetail = {
      _id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      popularity: movie.popularity,
      genre_ids: movie.genre_ids,
    };
    const newMovie = new Movie(movieDetail);
    await newMovie.save();
  }
}

async function clear() {
  await Genre.deleteMany({});
  await Movie.deleteMany({});
}
