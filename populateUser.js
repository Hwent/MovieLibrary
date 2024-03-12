#! /usr/bin/env node
//command node populatedb.js "mongodb+srv://cooluser:password"
console.log("generate fake user");
// Get arguments passed on command line
const userArgs = process.argv.slice(2);
const faker = require("faker");
const User = require("./models/user");
const Movie = require("./models/movie");
const { MovieDb } = require("moviedb-promise");
const dotenv = require("dotenv");
dotenv.config();
const moviedb = new MovieDb(process.env.KEY);

const mongoose = require("mongoose");
const { fa } = require("faker/lib/locales");
const user = require("./models/user");
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  await fakeUser();
  await fakeUser();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function fakeUser() {
  const sampleMovies = await Movie.aggregate([{ $sample: { size: 5 } }]);
  const userDetail = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    movies: sampleMovies.map((movie) => movie._id),
  };
  const newUser = new User(userDetail);
  await newUser.save();
  console.log(userDetail);
}
