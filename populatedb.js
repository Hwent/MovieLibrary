#! /usr/bin/env node
//command node populatedb.js "mongodb+srv://cooluser:password"
console.log("load test data");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Genre = require("./models/genre");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await creatGenre("Fantasy");
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function creatGenre(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  console.log(`Added genre: ${name}`);
}
